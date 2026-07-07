<div align="center">
  <h1>🚀 Syntra OS</h1>
  <p><b>Where Intelligent Workflows Think, Decide, and Execute.</b></p>
  <p>An Enterprise AI Platform that orchestrates autonomous agents for complex business processes.</p>
  
  <br/>
  <a href="https://syntra-rho.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🔴_Live_Demo-Visit_Syntra_OS-indigo?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <br/>
</div>

<br/>

Syntra OS is an advanced enterprise intelligence platform designed for hackathons and modern AI workforces. It goes beyond simple chatbots by deploying **Agentic Workflows** that can independently plan, reason, fetch enterprise knowledge, require human-in-the-loop approvals, and generate high-quality artifacts.

## ✨ Key Features

- **🧠 Autonomous Agent Orchestration:** Powered by a dynamic LangGraph backend, agents dynamically plan steps, invoke tools, and route tasks based on real-time business needs.
- **🎙️ Live Voice Assistant:** Control workflows and query the system using web-native speech recognition integrated directly into the dashboard.
- **📚 RAG Knowledge Base:** Connects with Supabase `pgvector` to semantically search and inject enterprise documents into the agent's context window.
- **📊 Real-Time Analytics:** A visually stunning, interactive dashboard built with Framer Motion to monitor AI workforce ROI, hours saved, and execution volumes.
- **🔒 Human-in-the-Loop:** High-risk actions automatically halt and wait for human approval before execution, ensuring enterprise safety.
- **📡 SSE Event Bus:** Watch agents think in real-time. The backend streams its execution graph, thoughts, and payload generations via Server-Sent Events (SSE).

## 🛠️ Architecture & Tech Stack

Syntra uses a decoupled, modern architecture to maximize scalability and AI performance:

### Frontend
- **Framework:** Next.js 15 (React 19, Turbopack)
- **Styling:** Tailwind CSS, Framer Motion (for fluid, premium animations)
- **State & Data:** Zustand, React Query
- **Deployment:** Vercel

### Backend (Intelligence Layer)
- **Framework:** FastAPI (Python 3.11+)
- **AI/LLM Core:** LangGraph, LangChain, Groq (Llama 3 70B for blazing fast reasoning)
- **Database & Vector Store:** Supabase (PostgreSQL + pgvector)
- **Tooling:** Python `uv` package manager

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- Python 3.11+
- [uv](https://github.com/astral-sh/uv) (Extremely fast Python package manager)
- Supabase account (for database)
- Groq API Key

### 1. Backend Setup
```bash
cd backend
# Create a .env file based on .env.example
cp .env.example .env

# Install dependencies using uv
uv sync

# Run the FastAPI server
uv run uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
# Create a .env.local file based on .env.example
cp .env.example .env.local

# Install dependencies
npm install

# Run the Next.js development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🎨 Design Philosophy
Syntra was built with a "Premium Enterprise" aesthetic. It features a polished dark mode, glassmorphism elements, subtle micro-interactions, and a responsive sidebar layout to ensure it feels like a next-generation operating system for AI workers.

---

<div align="center">
  <i>Built with ❤️ for the AI Hackathon</i>
</div>
