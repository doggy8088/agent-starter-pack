# 代理人範本

Agent Starter Pack 遵循「自帶代理人」的開發方式。它提供了多個可供生產使用的代理人範本，旨在加速您的開發，同時提供彈性讓您使用偏好的代理人框架或模式。

## 可用範本


| 代理人名稱 | 描述 | 使用案例 |
|------------|-------------|----------|
| `adk_base` | 一個使用 Google [Agent Development Kit](https://github.com/google/adk-python) 實作的基礎 ReAct 代理人 | 通用對話代理人 |
| `agentic_rag` | 一個用於文件檢索和問答的 RAG 代理人 | 文件搜尋和問答 |
| `langgraph_base_react` | 一個使用 LangGraph 的基礎 ReAct 代理人 | 基於圖形化的對話代理人 |
| `crewai_coding_crew` | 一個使用 CrewAI 實作的多代理人系統 | 協作程式設計協助 |
| `live_api` | 一個即時多模態 RAG 代理人 | 結合知識庫的音訊/影片/文字聊天 |

## 選擇合適的範本

選擇範本時，請考慮以下因素：

1.  **主要目標**: 您是要建立一個對話機器人、一個基於文件的問答系統、一個任務自動化團隊，還是其他？
2.  **核心模式/框架**: 您偏好 Google 的 ADK、LangChain/LangGraph、CrewAI，還是直接實作像 RAG 這樣的模式？Starter Pack 支援多種方法。
3.  **推理複雜度**: 您的代理人是否需要複雜的規劃和工具使用（例如 ReAct），還是更專注於檢索和綜合（例如基礎 RAG）？
4.  **協作需求**: 您是否需要多個專業代理人協同工作？
5.  **模態**: 您的代理人是否需要處理或回應音訊、影片或純文字？

## 範本詳情

### ADK 基礎範本 (`adk_base`)

此範本提供一個使用 Google [Agent Development Kit (ADK)](https://github.com/google/adk-python) 建立的 ReAct 代理人最小範例。它展示了 ADK 的核心概念，例如代理人建立和工具整合，實現推理和工具選擇。適用於：

*   在 Google Cloud 上開始代理人開發。
*   建構通用對話代理人。
*   學習 ADK 框架和 ReAct 模式。

### 代理人式 RAG (`agentic_rag`)

此範本基於 ADK，實作了[檢索增強生成 (RAG)](https://cloud.google.com/use-cases/retrieval-augmented-generation?hl=en)，並附帶一個可供生產使用的文件問答資料攝取管道。它允許您攝取、處理和嵌入自訂資料以增強回應相關性。特色包括：
*   自訂資料的自動化資料攝取管道。
*   彈性資料儲存選項：[Vertex AI Search](https://cloud.google.com/vertex-ai-search-and-conversation) 和 [Vertex AI Vector Search](https://cloud.google.com/vertex-ai/docs/vector-search/overview)。
*   產生自訂嵌入以增強語義搜尋。
*   從檢索到的上下文合成答案。
*   透過 Terraform 和 Cloud Build 進行基礎設施部署。

### LangGraph 基礎 ReAct (`langgraph_base_react`)
此範本提供一個使用 [LangGraph](https://langchain-ai.github.io/langgraph/) 建立的 ReAct 代理人最小範例。它為開發具有圖形化結構的代理人提供了絕佳的起點，提供：

*   用於複雜、多步驟推理流程的明確狀態管理。
*   對推理循環的細粒度控制。
*   強大的工具整合和錯誤處理能力。
*   使用 Vertex AI 支援串流回應。
*   包含一個基本搜尋工具以展示工具使用。

### CrewAI 程式設計團隊 (`crewai_coding_crew`)

此範本結合了 [CrewAI](https://www.crewai.com/) 的多代理人協作與 LangGraph 的對話控制，以建立一個互動式程式設計助理。它協調專業代理人（例如：資深工程師、品管工程師）來理解需求並產生程式碼。主要特色包括：

*   透過自然對話（LangGraph）進行互動式需求收集。
*   由專業 AI 代理人團隊（CrewAI）進行協作式程式碼開發。
*   從需求到實作和品管的任務序列處理。
*   適用於需要委派和模擬團隊協作的複雜任務。

### Live API (`live_api`)

此範本由 Google Gemini 提供支援，展示了一個使用 [Vertex AI Live API](https://cloud.google.com/vertex-ai/generative-ai/docs/live-api) 的即時多模態對話式 RAG 代理人。特色包括：
*   處理音訊、影片和文字互動。
*   利用工具呼叫。
*   透過 WebSockets 進行即時雙向通訊，實現低延遲聊天。
*   生產就緒的 Python 後端 (FastAPI) 和 React 前端。
*   包含回饋收集功能。

## 客製化範本

所有範本皆為起點，專為客製化而設計：

1.  選擇最符合您需求的範本。
2.  根據所選範本建立新的代理人實例。
3.  熟悉程式碼結構，重點關注代理人邏輯、工具定義以及任何 UI 元件。
4.  修改和擴展程式碼：根據需要調整提示、新增或移除工具、整合不同的資料來源、更改推理邏輯或更新框架版本。

盡情建立您的代理人吧！