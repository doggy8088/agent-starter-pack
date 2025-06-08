{%- if cookiecutter.datastore_type == "vertex_ai_search" -%}{%- set datastore_service_name = "Vertex AI Search" -%}{%- elif cookiecutter.datastore_type == "vertex_ai_vector_search" -%}{%- set datastore_service_name = "Vertex AI Vector Search" -%}{%- else -%}{%- set datastore_service_name = "Your Configured Datastore" -%}{%- endif -%}

# 數據擷取管線
此管線自動化數據擷取到 {{ datastore_service_name }} 的過程，簡化了建構檢索增強生成 (RAG) 應用程式的流程。

它協調了整個工作流程：載入數據、將其分塊成可管理的區段、使用 Vertex AI Embeddings 生成嵌入，並將處理後的數據匯入您的 {{ datastore_service_name }} 資料儲存庫。
您可以觸發管線進行初始數據載入，或排程定期執行，確保您的搜尋索引保持最新。Vertex AI Pipelines 為此過程提供協調與監控功能。

## 先決條件

在執行任何指令之前，請確保您已將 Google Cloud Project ID 設定為環境變數。此變數將由後續的 `make` 指令使用。

```bash
export PROJECT_ID="YOUR_PROJECT_ID"
```
將 `"YOUR_PROJECT_ID"` 替換為您實際的 Google Cloud 專案 ID。

現在，您可以設定開發環境：

1.  **設定開發環境：** 從儲存庫的根目錄使用以下指令，以 Terraform 在您的開發環境中佈建必要的資源。這包括部署資料儲存庫並設定所需的權限。

    ```bash
    make setup-dev-env
    ```
    此指令需要安裝並設定 `terraform`。
## 執行數據擷取管線

設定基礎設施後（使用 `make setup-dev-env`），您可以執行數據擷取管線。

> **注意：** 由於您的專案已為 Vertex AI Pipelines 設定，因此初始管線執行可能需要更長時間。

**步驟：**

**a. 執行管線：**
從儲存庫的根目錄執行以下指令。確保 `PROJECT_ID` 環境變數在您目前的 shell 工作階段中仍然設定（如先決條件中所設定）。

```bash
make data-ingestion
```

此指令會處理安裝相依性（如果需要，透過 `make install`）並使用從您的專案設定衍生的配置提交管線工作。傳遞給底層指令碼的特定參數取決於專案生成期間選擇的 `datastore_type`：
{%- if cookiecutter.datastore_type == "vertex_ai_search" %}
*   它將使用以下參數，例如 `--data-store-id`、`--data-store-region`。
{%- elif cookiecutter.datastore_type == "vertex_ai_vector_search" %}
*   它將使用以下參數，例如 `--vector-search-index`、`--vector-search-index-endpoint`、`--vector-search-data-bucket-name`。
{%- endif %}
*   常見參數包括 `--project-id`、`--region`、`--service-account`、`--pipeline-root` 和 `--pipeline-name`。

**b. 管線排程：**
The `make data-ingestion` command triggers an immediate pipeline run. For production environments, the underlying `submit_pipeline.py` script also supports scheduling options with flags like `--schedule-only` and `--cron-schedule` for periodic execution.

**c. 監控管線進度：**
管線的配置和執行狀態連結將在提交後列印到控制台。如需詳細監控，請使用 Google Cloud Console 中的 Vertex AI Pipelines 儀表板。

## 測試您的 RAG 應用程式
數據擷取管線成功完成後，您可以測試您的 RAG 應用程式與 {{ datastore_service_name }}。
{%- if cookiecutter.datastore_type == "vertex_ai_search" %}
> **疑難排解：** 如果您在初始數據擷取後遇到錯誤 `"google.api_core.exceptions.InvalidArgument: 400 The embedding field path: embedding not found in schema"`，請等待幾分鐘再試一次。此延遲可讓 Vertex AI Search 完全索引已擷取的數據。
{%- endif %}