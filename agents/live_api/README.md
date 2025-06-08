# 多模態即時代理

此模式展示了一個由 Google Gemini 驅動的即時對話代理。該代理處理音訊、影片和文字互動，同時利用工具呼叫功能來強化回應。

![live_api_diagram](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/live_api_diagram.png)

**關鍵元件：**

- **Python 後端**（位於 `app/` 資料夾中）：一個使用 [FastAPI](https://fastapi.tiangolo.com/) 和 [google-genai](https://googleapis.github.io/python-genai/) 建立的生產就緒伺服器，具備以下特色：

  - **即時雙向通訊**透過 WebSockets 在前端和 Gemini 模型之間實現
  - **整合工具呼叫**，具備天氣資訊工具，用於展示外部資料檢索
  - **生產級可靠性**，具備重試邏輯和自動重新連線功能
  - **部署彈性**支援 AI Studio 和 Vertex AI 端點
  - **回饋記錄端點**用於收集使用者互動

- **React 前端**（位於 `frontend/` 資料夾中）：擴展了 [Multimodal live API Web Console](https://github.com/google-gemini/multimodal-live-api-web-console)，並增加了如**自訂 URL** 和**回饋收集**等功能。

![live api demo](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/live_api_pattern_demo.gif)

一旦後端和前端都在執行，請點擊前端使用者介面中的播放按鈕，以建立與後端的連線。您現在可以與多模態即時代理互動了！您可以嘗試提問，例如「舊金山的天氣如何？」，以查看代理如何使用其天氣資訊工具。

## Multimodal Live API 的額外資源

瀏覽這些資源，以了解更多關於 Multimodal Live API 的資訊，並查看其使用範例：

- [Project Pastra](https://github.com/heiko-hotz/gemini-multimodal-live-dev-guide/tree/main)：Gemini Multimodal Live API 的綜合開發者指南。
- [Google Cloud Multimodal Live API 展示和範例](https://github.com/GoogleCloudPlatform/generative-ai/tree/main/gemini/multimodal-live-api)：在 Vertex AI 中利用多模態即時 API 的程式碼範例和展示應用程式集合
- [Gemini 2 秘訣](https://github.com/google-gemini/cookbook/tree/main/gemini-2)：使用 Gemini 2 的實用範例和指南
- [Multimodal Live API 網頁主控台](https://github.com/google-gemini/multimodal-live-api-web-console)：用於測試和實驗 Gemini Multimodal Live API 的互動式 React 網頁介面。

## 目前狀態與未來工作

此模式仍在積極開發中。未來增強的關鍵領域包括：

*   **可觀察性：** 實施全面的監控和追蹤功能。
*   **負載測試：** 整合負載測試功能。