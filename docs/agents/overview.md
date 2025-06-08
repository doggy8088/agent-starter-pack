# 代理模板

代理啟動包遵循「自帶代理」的方法。它提供多個生產就緒的代理模板，旨在加速您的開發，同時提供彈性，讓您可以使用偏好的代理框架或模式。

## 可用模板


| 代理名稱 | 描述 | 用途 |
|------------|-------------|----------|
| `adk_base` | 一個使用 Google [Agent Development Kit](https://github.com/google/adk-python) 實作的基礎 ReAct 代理 | 通用對話代理 |
| `agentic_rag` | 用於文件檢索和問答的 RAG 代理 | 文件搜尋和問答 |
| `langgraph_base_react` | 一個使用 LangGraph 的基礎 ReAct 代理 | 基於圖形的對話代理 |
| `crewai_coding_crew` | 一個使用 CrewAI 實作的多代理系統 | 協作式程式設計協助 |
| `live_api` | 一個即時多模態 RAG 代理 | 與知識庫進行音訊/影片/文字聊天 |

## 選擇合適的模板

選擇模板時，請考慮以下因素：

1.  **主要目標**：您是要建立一個對話機器人、一個基於文件的問答系統、一個任務自動化團隊，還是其他？
2.  **核心模式/框架**：您偏好 Google 的 ADK、LangChain/LangGraph、CrewAI，還是直接實作像 RAG 這樣的模式？啟動包支援多種方法。
3.  **推理複雜度**：您的代理是否需要複雜的規劃和工具使用（如 ReAct），還是更專注於檢索和綜合（如基本的 RAG）？
4.  **協作需求**：您是否需要多個專業代理協同工作？
5.  **模態**：您的代理是否需要處理或回應音訊、影片，或僅是文字？

## 模板詳情

### ADK 基礎 (`adk_base`)

此模板提供一個使用 Google [Agent Development Kit (ADK)](https://github.com/google/adk-python) 建立的 ReAct 代理的最小範例。它展示了 ADK 的核心概念，如代理建立和工具整合，並實現推理和工具選擇。適用於：

*   開始在 Google Cloud 上進行代理開發。
*   建構通用對話代理。
*   學習 ADK 框架和 ReAct 模式。

### Agentic RAG (`agentic_rag`)

此模板基於 ADK，實作了[檢索增強生成 (RAG)](https://cloud.google.com/use-cases/retrieval-augmented-generation?hl=en)，並附帶生產就緒的資料擷取管道，用於基於文件的問答。它允許您擷取、處理和嵌入自訂資料以提升回應相關性。功能包括：

*   用於自訂資料的自動化資料擷取管道。
*   彈性資料儲存選項：[Vertex AI Search](https://cloud.google.com/vertex-ai-search-and-conversation) 和 [Vertex AI Vector Search](https://cloud.google.com/vertex-ai/docs/vector-search/overview)。
*   產生自訂嵌入以增強語義搜尋。
*   從檢索到的上下文合成答案。
*   透過 Terraform 和 Cloud Build 部署基礎設施。

### LangGraph 基礎 ReAct (`langgraph_base_react`)

此模板提供一個使用 [LangGraph](https://langchain-ai.github.io/langgraph/) 建立的 ReAct 代理的最小範例。它作為開發具有圖形結構的代理的絕佳起點，提供：

*   針對複雜多步驟推理流程的明確狀態管理。
*   對推理週期的細粒度控制。
*   強大的工具整合和錯誤處理功能。
*   使用 Vertex AI 支援串流回應。
*   包含一個基本搜尋工具以展示工具使用。

### CrewAI 程式設計團隊 (`crewai_coding_crew`)

此模板結合了 [CrewAI](https://www.crewai.com/) 的多代理協作與 LangGraph 的對話控制，以建立一個互動式程式設計助理。它協調專業代理（例如：資深工程師、品管工程師）來理解需求並產生程式碼。主要功能包括：

*   透過自然對話（LangGraph）互動式地收集需求。
*   由專業 AI 代理團隊（CrewAI）進行協作式程式碼開發。
*   從需求到實作和品質保證的任務順序處理。
*   適用於需要委派和模擬團隊協作的複雜任務。

### 即時 API (`live_api`)

此模板由 Google Gemini 提供支援，展示了一個使用 [Vertex AI 即時 API](https://cloud.google.com/vertex-ai/generative-ai/docs/live-api) 的即時多模態對話 RAG 代理。功能包括：

*   處理音訊、影片和文字互動。
*   利用工具呼叫。
*   透過 WebSockets 實現即時雙向通訊，以進行低延遲聊天。
*   生產就緒的 Python 後端 (FastAPI) 和 React 前端。
*   包含意見回饋收集功能。

## 客製化範本

所有範本都作為起點提供，並專為客製化而設計：

1.  選擇最符合您需求的範本。
2.  根據所選範本建立新的代理執行個體。
3.  熟悉程式碼結構，專注於代理邏輯、工具定義和任何 UI 元件。
4.  修改並擴展程式碼：根據需要調整提示、新增或移除工具、整合不同的資料來源、變更推論邏輯，或更新框架版本。

祝您建構代理愉快！