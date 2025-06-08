# 疑難排解

本指南協助解決 Agent Starter Pack 的常見問題。

## 驗證問題

如需 Vertex AI 驗證的詳細資訊，請參閱 [官方文件](https://cloud.google.com/vertex-ai/docs/authentication)。

### 「找不到憑證」或「找不到專案」錯誤

**問題**：Vertex AI 遺失憑證錯誤。

**解決方案**：

1.  登入 Google Cloud：`gcloud auth login --update-adc`
2.  設定正確的專案：
    ```bash
    gcloud config set project YOUR_PROJECT_ID
    gcloud auth application-default set-quota-project YOUR_PROJECT_ID
    ```

### Vertex AI API 未啟用

**問題**：由於您的專案中未啟用 Vertex AI API，操作失敗。

**解決方案**：

1. 啟用 Vertex AI API：
   ```bash
   gcloud services enable aiplatform.googleapis.com
   ```

2. 驗證 API 是否啟用：
   ```bash
   gcloud services list --filter=aiplatform.googleapis.com
   ```
### 權限遭拒錯誤
**問題**：Google Cloud API 傳回「權限遭拒」錯誤。

**解決方案**：請確保您的使用者或服務帳戶具備必要的 IAM 角色。例如，對於 Vertex AI，您通常需要 `roles/aiplatform.user`。使用 `gcloud projects add-iam-policy-binding` 指令或 Cloud Console 授予角色。

### 找不到指令：agent-starter-pack

**問題**：安裝後出現「找不到指令」錯誤。

**解決方案**：
pip list | grep agent-starter-pack
   ```
2. 檢查 PATH：
   ```bash
   echo $PATH
   ```
3. 如有需要請重新安裝：
   ```bash
   pip install --user agent-starter-pack
   ```
4. 對於 pipx：
   ```bash
   pipx ensurepath
   source ~/.bashrc  # or ~/.zshrc
   ```

## 專案建立問題

### 專案建立失敗

**問題**：`agent-starter-pack create` 失敗。

**解決方案**：

1.  **檢查錯誤訊息**：檢查輸出以尋找線索。
2.  **寫入權限**：請確保對目錄具有寫入權限。
3.  **專案名稱**：僅使用小寫字母、數字和連字號。
4.  **偵錯模式**：考慮使用偵錯模式以取得更詳細的錯誤資訊：
    ```bash
    agent-starter-pack create my-project-name --debug
    ```

### Agent Engine 問題

考慮利用[公開產品文件](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/troubleshooting/set-up)。

## 取得更多協助
如果問題持續存在：

1.  **檢查 GitHub 問題**：在 `agent-starter-pack` GitHub 儲存庫中搜尋現有問題。
2.  **提出新問題**：提供：

    *   問題描述。
    *   重現步驟。
    *   錯誤訊息（最好使用 `--debug` 旗標執行以取得詳細記錄）。
    *   環境：作業系統、Python 版本、`agent-starter-pack` 版本、安裝方法、Shell。