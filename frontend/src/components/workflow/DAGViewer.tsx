"use client";

import { useEffect, useState } from "react";
import { ReactFlow, Background, Controls, Node, Edge, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { eventStream } from "@/lib/api/sse";
import { Database, BrainCircuit, ShieldAlert, Cpu, CheckCircle2, Clock } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

const AgentNode = ({ data }: { data: { status: string; role: string; icon: React.ReactNode; label: string; } }) => {
  return (
    <div className={`px-4 py-3 rounded-xl border ${data.status === 'completed' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-amber-500/50 bg-amber-500/10'} shadow-lg backdrop-blur-md w-56 transition-all duration-300`}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${data.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
          {data.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 truncate">{data.role}</div>
          <div className={`text-sm font-semibold truncate ${data.status === 'completed' ? 'text-emerald-300' : 'text-amber-300'}`}>{data.label.replace(/_/g, ' ')}</div>
        </div>
        <div>
          {data.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-500 animate-pulse" />}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
    </div>
  );
};

const nodeTypes = { agent: AgentNode };

const getAgentInfo = (name: string) => {
  if (name.includes('Retrieval') || name.includes('Knowledge')) return { role: "Knowledge Agent", icon: <Database className="w-4 h-4"/> };
  if (name.includes('Analysis') || name.includes('Data')) return { role: "Analysis Agent", icon: <BrainCircuit className="w-4 h-4"/> };
  if (name.includes('Approval')) return { role: "Governance Agent", icon: <ShieldAlert className="w-4 h-4"/> };
  return { role: "Orchestrator Agent", icon: <Cpu className="w-4 h-4"/> };
};



export function DAGViewer() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    // We connect if not connected, though demo/page.tsx already connects it.
    eventStream.connect();

    let nodeIndex = 0;
    let prevNodeId: string | null = null;

    const addNode = (nodeName: string, status: 'running' | 'completed') => {
      setNodes(prev => {
        // If node already exists, update its status
        const existingIdx = prev.findIndex(n => n.data.rawLabel === nodeName);
        if (existingIdx >= 0) {
          const newNodes = [...prev];
          newNodes[existingIdx] = {
            ...newNodes[existingIdx],
            data: { ...newNodes[existingIdx].data, status }
          };
          return newNodes;
        }

        // Add new node
        nodeIndex++;
        const newNodeId = nodeIndex.toString();
        const agentInfo = getAgentInfo(nodeName);
        const newNode: Node = {
          id: newNodeId,
          type: 'agent',
          position: { x: 250, y: 50 + (nodeIndex - 1) * 120 },
          data: { rawLabel: nodeName, label: nodeName, status, role: agentInfo.role, icon: agentInfo.icon },
        };

        if (prevNodeId) {
          setEdges(prevEdges => [
            ...prevEdges,
            { 
              id: `e${prevNodeId}-${newNodeId}`, 
              source: prevNodeId!, 
              target: newNodeId, 
              animated: true, 
              style: { stroke: "#6366f1", strokeWidth: 2 } 
            }
          ]);
        }
        
        prevNodeId = newNodeId;
        return [...prev, newNode];
      });
    };

    const unsubscribeStarted = eventStream.on("NodeStarted", (data: unknown) => {
      const payload = data as { node: string };
      if (payload?.node) addNode(payload.node, 'running');
    });

    const unsubscribeCompleted = eventStream.on("NodeCompleted", (data: unknown) => {
      const payload = data as { node: string };
      if (payload?.node) addNode(payload.node, 'completed');
    });

    return () => {
      unsubscribeStarted();
      unsubscribeCompleted();
    };
  }, []);

  return (
    <div className="h-[400px] w-full rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-md overflow-hidden relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent transition-opacity duration-500"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#27272a" />
        <Controls className="fill-zinc-400 stroke-zinc-400 !bg-zinc-900 !border-zinc-800" />
      </ReactFlow>
    </div>
  );
}
