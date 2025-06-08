# 開發指南

::: tip 注意
這份入門套件秉持著**「自帶代理」**的哲學。您專注於獨特的業務邏輯，我們則提供 UI、基礎設施、部署和監控的基礎框架。
:::

### 1. 代理原型開發
首先，建立並實驗您的生成式 AI 代理。
*   請使用 `notebooks/` 中的入門筆記本作為指南。這對於快速實驗和專注於代理邏輯開發，在整合到完整的應用程式結構之前，是理想的選擇。
*   使用 [Vertex AI 評估](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-overview) 來評估其效能。

### 2. 整合代理
將您原型開發的代理整合到應用程式中。

*   編輯 `app/agent.py` 以匯入並設定您的代理。
*   自訂 `app/` 目錄中的程式碼（例如，提示、工具、API 端點、業務邏輯、功能）。

### 3. 本地測試
使用內建的 UI playground 迭代您的代理。它會在程式碼變更時自動重新載入，並提供聊天記錄、使用者回饋和多樣輸入類型等功能。

> 注意：由 `make playground` 啟動的特定 UI playground (例如，Streamlit, ADK web UI) 取決於您選擇的代理範本。

### 4. 部署至雲端
一旦您滿意本地測試結果，就可以將您的代理部署到 Google Cloud！

*所有 `make` 命令都應從代理專案的根目錄執行。*

#### A. 雲端開發環境設定
在雲端建立開發 (dev) 環境，以進行初步的遠端測試。

**i. 設定 Google Cloud 專案：**
設定 `gcloud` 以指向您的開發專案：
```bash
# 將 YOUR_DEV_PROJECT_ID 替換為您實際的 Google Cloud 專案 ID
gcloud config set project YOUR_DEV_PROJECT_ID
```

**ii. 佈建雲端資源：**
此命令使用 Terraform (位於 `deployment/terraform/dev/` 中的腳本) 來設定必要的雲端資源 (IAM、資料庫等)：
```bash
make setup-dev-env
```

**iii. 🚀 部署代理後端：**
建構並部署您的代理後端到開發環境：
```bash
make backend
```

#### B. 具備 CI/CD 的生產就緒部署
對於可靠、自動化的預演與生產環境部署，CI/CD 管道至關重要。根據需要自訂管道中的測試。

**選項 1：一鍵式 CI/CD 設定 (推薦用於 GitHub)**
`agent-starter-pack` CLI 簡化了 GitHub 上的 CI/CD 設定：
```bash
uvx agent-starter-pack setup-cicd
```
這會自動建立 GitHub 儲存庫、連接到 Cloud Build、使用 Terraform 設定預演/生產基礎設施，並設定 CI/CD 觸發器。

請按照互動式提示操作。對於需要細粒度控制的關鍵系統，請考慮手動設定。
有關詳細資訊，請參閱 [`agent-starter-pack setup-cicd` CLI 參考](../cli/setup_cicd)。*(注意：自動化設定目前僅支援 GitHub)。*

**選項 2：手動 CI/CD 設定**
對於完全控制以及與其他 Git 供應商的相容性，請參閱[手動部署設定指南](./deployment.md)。

**首次提交與推送 (CI/CD 設定後)：**
CI/CD 設定完成後，提交並推送您的程式碼以觸發首次管道執行：
```bash
git add -A
git config --global user.email "you@example.com" # 如果尚未設定
git config --global user.name "Your Name"     # 如果尚未設定
git commit -m "代理程式碼的首次提交"
git push --set-upstream origin main
```

### 5. 監控已部署的代理
使用整合的 Observability 工具追蹤代理的效能並收集深入分析。
*   **技術**：OpenTelemetry 事件會傳送到 Google Cloud。
*   **Cloud Trace & Logging**：檢查請求流程、分析延遲並檢閱提示/輸出。在以下位置存取追蹤：`https://console.cloud.google.com/traces/list?project=YOUR_PROD_PROJECT_ID`
*   **BigQuery**：將追蹤和日誌資料路由到 BigQuery，用於長期儲存和進階分析。
*   **Looker Studio 資訊主頁**：使用預先建立的範本視覺化代理效能：
    *   ADK 代理：[Looker Studio ADK 資訊主頁](https://lookerstudio.google.com/c/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC)
    *   非 ADK 代理：[Looker Studio 非 ADK 資訊主頁](https://lookerstudio.google.com/c/reporting/fa742264-4b4b-4c56-81e6-a667dd0f853f/page/tEnnC)
    *(請記得遵循資訊主頁中的「設定說明」以連接您的專案資料來源)。*

➡️ 有關詳細資訊，請參閱[Observability 指南](./observability.md)。
### 6. 進階自訂與資料
進一步客製化入門套件以符合特定需求。

*   **RAG 資料攝取**：針對檢索增強生成 (RAG) 代理，設定資料管道以處理您的資訊並將嵌入載入至 Vertex AI Search 或 Vector Search。
    ➡️ 請參閱 [資料攝取指南](./data-ingestion.md)。
*   **自訂 Terraform**：修改 `deployment/terraform/` 中的 Terraform 設定，以滿足獨特的基礎設施需求。
    ➡️ 請參閱 [部署指南](./deployment.md)。