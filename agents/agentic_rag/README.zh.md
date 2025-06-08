# 代理式 RAG

此代理透過生產級資料攝取管線增強代理啟動套件，豐富您的檢索增強生成 (RAG) 應用程式。您將能夠攝取、處理並嵌入自訂資料，提升生成回應的相關性與上下文。您可以根據特定需求，在 Vertex AI Search 和 Vertex AI Vector Search 等不同的資料儲存選項之間進行選擇。
此代理提供基礎架構，可使用您的自訂程式碼建立 Vertex AI Pipeline。由於它是建構於 Vertex AI Pipelines 之上，因此您可以受益於排程執行、重複執行和隨選觸發器等功能。對於處理太位元組級資料，我們建議將 Vertex AI Pipelines 與 BigQuery 或 Dataflow 等資料分析工具結合使用。
![搜尋代理展示](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/starter-pack-search-pattern.gif)

## 架構

此代理實作以下架構：

![架構圖](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/agentic_rag_vertex_ai_search_architecture.png)

### 主要功能
- **建構於代理開發套件 (ADK)：** ADK 是一個彈性、模組化的框架，用於開發和部署 AI 代理。它與 Google 生態系和 Gemini 模型整合，支援多種 LLM 和開放原始碼 AI 工具，支援簡單和複雜的代理架構。
- **彈性資料儲存選項：** 根據您的特定需求，在 Vertex AI Search 或 Vertex AI Vector Search 之間進行選擇，以實現高效的資料儲存與檢索。
- **自動化資料攝取管線：** 自動化從輸入資料來源攝取資料的處理程序。
- **自訂嵌入：** 使用 Vertex AI Embeddings 產生嵌入，並將其整合到您的資料中，以強化語義搜尋。
- **Terraform 部署：** 攝取管線與啟動套件的其餘基礎架構一同透過 Terraform 實例化。
- **Cloud Build 整合：** 攝取管線的部署已新增至啟動套件的 CD 管線。
- **可自訂程式碼：** 輕鬆調整和自訂程式碼，以符合您的特定應用程式需求和資料來源。