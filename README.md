<div align="center">
  <h1>🚀 Syntra OS</h1>
  <p><b>Where Intelligent Workflows Think, Decide, and Execute.</b></p>
  <p>An Enterprise AI Operating System that converts natural language into explainable, autonomous, multi-step enterprise workflows executed through specialized AI agents with human approval where required.</p>
  
  <br/>
  <a href="https://syntra-rho.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🔴_Live_Demo-Visit_Syntra_OS-indigo?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <br/>
</div>

<br/>

## 1. Project Title
**Syntra OS:** The Enterprise AI Operating System for Autonomous Agentic Workflows.

---

## 2. Problem Statement
*(Theme 2: AI Automation & Intelligent Agents)*
**Curated Problem 1:** *Autonomous Workflow Agents* - Businesses lack intelligent systems that can automatically execute multi-step workflows involving multiple departments and approvals. Current automation tools are rigid and lack reasoning.
**Curated Problem 2:** *AI Knowledge Assistant* - Employees struggle to find accurate information quickly due to fragmented knowledge sources, leading to AI hallucinations.

---

## 3. Solution
Syntra OS is an advanced enterprise intelligence platform that solves these problems by deploying **Agentic Workflows**. Unlike standard chatbots, Syntra uses a multi-agent orchestration engine to dynamically plan, reason, fetch enterprise knowledge via RAG (Retrieval-Augmented Generation), request human-in-the-loop approvals for sensitive actions, and execute tasks autonomously. 

---

## 4. Features
- **🧠 Autonomous Workflow Agents:** Powered by LangGraph, specialized AI agents (Planners, Reviewers, Executors) dynamically plan steps and route tasks based on real-time business needs.
- **🔒 Human-in-the-Loop (HITL):** High-risk actions automatically halt and wait for human approval before execution. Syntra generates the payloads, but a human must click "Approve".
- **📚 Enterprise Knowledge Base (RAG):** Connects with Supabase `pgvector` to semantically search and inject internal company documents into the agent's context window, preventing hallucinations.
- **📊 Real-Time Analytics Dashboard:** A visually stunning UI built with Framer Motion to monitor AI workforce ROI, hours saved, and execution volumes.
- **📡 Live Execution Graph:** Watch agents "think" in real-time via Server-Sent Events (SSE) streaming their thought processes and task execution graphs.

---

## 5. Tech Stack
**Frontend:** Next.js 15, React 19, Tailwind CSS, Framer Motion, Zustand, React Query
**Backend (Intelligence Layer):** Python 3.11, FastAPI, LangGraph, LangChain
**AI Models:** Google Gemini 2.5 (Primary LLM & Embeddings), Groq Llama 3.3 (Fast Inference)
**Database & Vector Store:** Supabase (PostgreSQL + pgvector)
**Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 6. Installation

### Prerequisites
- Node.js 20+
- Python 3.11+
- [uv](https://github.com/astral-sh/uv) (Extremely fast Python package manager)

### Backend Setup
```bash
cd backend
# Create and configure your environment variables
cp .env.example .env

# Install dependencies using uv
uv sync

# Run the FastAPI server
uv run uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
# Configure your local environment
cp .env.example .env.local

# Install dependencies
npm install

# Start the Next.js development server
npm run dev
```

---

## 7. Usage
1. Open the application at `http://localhost:3000`.
2. Navigate to the **Knowledge Base** to upload and index enterprise documents.
3. Go to the **Workflow Studio** to enter a natural language prompt (e.g., "Analyze our Q3 finances and draft an email").
4. Watch the **Execution Graph** as agents autonomously plan the task.
5. If required, navigate to the **Approvals** tab to review and authorize the agent's proposed action.

---

## 8. Project Structure
```text
syntra-os/
├── backend/                # Python FastAPI Backend
│   ├── app/
│   │   ├── ai/             # LangGraph Agents & LLM Providers (Gemini/Groq)
│   │   ├── api/            # REST endpoints & SSE streaming routes
│   │   ├── knowledge/      # RAG Pipeline (Chunking, Embedding, Search)
│   │   └── core/           # Configs and Middleware
│   ├── scripts/            # Database initialization scripts
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── app/            # App Router pages (Dashboard, Studio, Knowledge Base)
│   │   ├── components/     # Reusable UI components & Icons
│   │   └── lib/            # Utilities, API clients, and Zustand stores
│   └── tailwind.config.ts  # Design system configuration
└── README.md               # You are here
```

---

## 9. Screenshots / Demo
**Live Demo Link:** [Syntra OS on Vercel](https://syntra-rho.vercel.app/)

*(Note for Hackathon: Add screenshots of your Mission Control, Workflow Studio, and Approvals page here prior to submission!)*
```markdown
<!-- Example Image Format -->
<!-- ![Mission Control Dashboard](/path/to/screenshot1.png) -->
```

---

## 10. Future Scope
- **Multi-Modal Agents:** Allowing agents to ingest and analyze images, charts, and audio files alongside text documents.
- **Third-Party Integrations Ecosystem:** Creating a plug-and-play marketplace for agents to connect with tools like Salesforce, Jira, and Slack.
- **Enterprise RBAC:** Granular Role-Based Access Control so specific users can only approve specific types of agentic workflows.

---

## 11. Team
- **Thirupathi Burra** - Full Stack AI Developer & Architect
*(Add any other team members, designers, or mentors here!)*

---

## 12. License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<div align="center">
  <i>Built with ❤️ for the AI Hackathon Evaluation</i>
</div>
