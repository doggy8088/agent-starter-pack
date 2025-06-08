# 代理式 RAG

這個代理程式強化了代理程式入門套件，提供生產級資料擷取管線，強化您的檢索增強生成 (RAG) 應用程式。您將能夠擷取、處理及嵌入自訂資料，從而提升生成回應的相關性和語境。您可以根據您的特定需求，在 Vertex AI Search 和 Vertex AI Vector Search 等不同資料儲存選項之間進行選擇。

此代理程式提供了基礎設施，讓您能使用自訂程式碼建立 Vertex AI Pipelines。由於它基於 Vertex AI Pipelines 建構，您可以受益於排程執行、重複執行和按需觸發等功能。對於處理兆位元組級資料，我們建議將 Vertex AI Pipelines 與 BigQuery 或 Dataflow 等資料分析工具結合使用。

![search agent demo](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/starter-pack-search-pattern.gif)

## 架構

此代理程式實作了以下架構：

![architecture diagram](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/agentic_rag_vertex_ai_search_architecture.png)

### 主要功能

- **基於代理程式開發套件 (ADK) 建構：** ADK 是一個彈性、模組化的框架，用於開發和部署 AI 代理程式。它整合了 Google 生態系統和 Gemini 模型，支援多種 LLM 和開源 AI 工具，實現了簡單和複雜的代理程式架構。
- **彈性資料儲存選項：** 根據您的特定需求，在 Vertex AI Search 或 Vertex AI Vector Search 之間進行選擇，以實現高效的資料儲存和檢索。
- **自動化資料擷取管線：** 自動化從輸入資料來源擷取資料的過程。
- **自訂嵌入：** 使用 Vertex AI Embeddings 產生嵌入，並將其整合到您的資料中，以增強語義搜尋。
- **Terraform 部署：** 擷取管線是透過 Terraform 與入門套件的其餘基礎設施一同實例化。
- **Cloud Build 整合：** 擷取管線的部署已添加到入門套件的持續部署 (CD) 管線中。
- **可自訂程式碼：** 輕鬆調整和自訂程式碼，以符合您的特定應用程式需求和資料來源。
