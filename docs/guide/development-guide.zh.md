# 開發指南

::: tip 注意
此啟動套件秉持「**自備代理**」的理念。您可專注於您獨特的業務邏輯，我們則提供使用者介面、基礎設施、部署和監控的框架。
:::

### 1. 開發代理原型
從建構和實驗您的生成式 AI 代理開始。
*   使用 `notebooks/` 中的入門筆記本以獲得指導。這非常適合在整合到完整應用程式結構之前，進行快速實驗和專注於代理邏輯的開發
*   使用 [Vertex AI Evaluation](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-overview) 評估其效能。

### 2. 整合您的代理
將您的原型代理整合到應用程式中。

*   編輯 `app/agent.py` 以匯入並設定您的代理。
*   自訂 `app/` 目錄中的程式碼（例如：提示、工具、API 端點、業務邏輯、功能）。

### 3. 在本地測試
使用內建的使用者介面測試環境（playground）迭代您的代理。它會自動在程式碼變更時重新載入，並提供如聊天記錄、使用者回饋和多種輸入類型等功能。

> 注意：透過 `make playground` 啟動的特定使用者介面測試環境（例如：Streamlit、ADK web UI）取決於您選擇的代理範本。

### 4. 部署到雲端
當您對本地測試滿意後，即可將您的代理部署到 Google Cloud！

*所有 `make` 指令都應從代理專案的根目錄執行。*

#### A. 雲端開發環境設定
在雲端建立開發 (dev) 環境，以進行初始遠端測試。

**i. 設定 Google Cloud 專案：**
設定 `gcloud` 以指向您的開發專案：
```bash
# 將 YOUR_DEV_PROJECT_ID 替換為您實際的 Google Cloud 專案 ID
gcloud config set project YOUR_DEV_PROJECT_ID
```

**ii. 佈建雲端資源：**
此指令使用 Terraform（`deployment/terraform/dev/` 中的指令碼）來設定必要的雲端資源（例如：IAM、資料庫等）：
```bash
make setup-dev-env
```

**iii. 🚀 部署代理後端：**
建構並部署代理後端至開發環境：
```bash
make backend
```

#### B. 具備 CI/CD 的正式環境部署
為了對預備環境和正式環境進行可靠且自動化的部署，CI/CD 管道是不可或缺的。可根據需求自訂管道中的測試。

**選項 1：一鍵式 CI/CD 設定（建議用於 GitHub）**
`agent-starter-pack` CLI 簡化了 GitHub 上的 CI/CD 設定：
```bash
uvx agent-starter-pack setup-cicd
```
這會自動建立 GitHub 存放庫、連接到 Cloud Build、使用 Terraform 設定預備/正式環境基礎設施，以及設定 CI/CD 觸發條件。
請遵循互動式提示。對於需要精細控制的關鍵系統，請考慮手動設定。
詳情請參閱 [`agent-starter-pack setup-cicd` CLI 參考文件](../cli/setup_cicd)。*(注意：自動設定目前僅支援 GitHub)。*

**選項 2：手動 CI/CD 設定**
為了獲得完整的控制權並與其他 Git 供應商相容，請參閱 [手動部署設定指南](./deployment.md)。

**首次提交與推送（CI/CD 設定後）：**
一旦 CI/CD 設定完成，提交並推送您的程式碼以觸發首次管道執行：
```bash
git add -A
git config --global user.email "you@example.com" # 如果尚未設定
git config --global user.name "Your Name"     # 如果尚未設定
git commit -m "代理程式碼的首次提交"
git push --set-upstream origin main
```

### 5. 監控您已部署的代理
使用整合的觀測工具追蹤代理的效能並收集深入分析。
*   **技術**：OpenTelemetry 事件會傳送到 Google Cloud。
*   **Cloud Trace 和 Logging**：檢查請求流程、分析延遲並檢閱提示/輸出。在以下網址存取追蹤資料：`https://console.cloud.google.com/traces/list?project=YOUR_PROD_PROJECT_ID`
*   **BigQuery**：將追蹤和記錄資料路由到 BigQuery，以進行長期儲存和進階分析。
*   **Looker Studio 資訊主頁**：使用預建範本視覺化代理效能：
    *   ADK 代理：[Looker Studio ADK 資訊主頁](https://lookerstudio.google.com/c/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC)
    *   非 ADK 代理：[Looker Studio 非 ADK 資訊主頁](https://lookerstudio.google.com/c/reporting/fa742264-4b4b-4c56-81e6-a667dd0f853f/page/tEnnC)
    *（請記得遵循資訊主頁中的「設定說明」以連接您專案的資料來源）。*

➡️ 詳情請參閱 [觀測指南](./observability.md)。
### 6. 進階客製化與資料
進一步客製化啟動套件以符合特定需求。

*   **RAG 資料擷取**: 對於檢索增強生成 (RAG) 代理，請設定資料管線以處理您的資訊，並將嵌入載入 Vertex AI Search 或 Vector Search。
    ➡️ 請參閱 [資料擷取指南](./data-ingestion.md)。
*   **客製化 Terraform**: 修改 `deployment/terraform/` 中的 Terraform 配置以符合獨特的基礎設施需求。
    ➡️ 請參閱 [部署指南](./deployment.md)。
