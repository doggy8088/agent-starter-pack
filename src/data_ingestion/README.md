{
%- if cookiecutter.datastore_type == "vertex_ai_search" -%}
{%- set datastore_service_name = "Vertex AI Search" -%}
{%- elif cookiecutter.datastore_type == "vertex_ai_vector_search" -%}
{%- set datastore_service_name = "Vertex AI Vector Search" -%}
{%- else -%}
{%- set datastore_service_name = "Your Configured Datastore" -%}
{%- endif -%}

# 資料擷取管線

此管線自動化了資料匯入 {{ datastore_service_name }}，簡化了建構檢索增強生成（RAG）應用程式的流程。

它協調了完整的工作流程：載入資料、將其分塊成可管理的區段、使用 Vertex AI Embeddings 生成嵌入向量，並將處理後的資料匯入您的 {{ datastore_service_name }} 資料儲存區。

您可以針對首次資料載入觸發管線，或排程讓其定期執行，以確保您的搜尋索引保持最新。Vertex AI Pipelines 為此流程提供了協調與監控功能。

## 前置步驟

在執行任何指令之前，請確保您已將 Google Cloud 專案 ID 設定為環境變數。此變數將用於後續的 `make` 指令。

```bash
export PROJECT_ID="YOUR_PROJECT_ID"
```
將 `"YOUR_PROJECT_ID"` 替換為您實際的 Google Cloud 專案 ID。

現在，您可以設定開發環境：

1.  **設定開發環境：** 使用儲存庫根目錄中的以下指令，以 Terraform 在您的開發環境中佈建必要的資源。這包括部署資料儲存區並設定所需的權限。

    ```bash
    make setup-dev-env
    ```
    此指令需要安裝並設定 `terraform`。

## 執行資料擷取管線

在使用 `make setup-dev-env` 設定基礎設施後，您可以執行資料擷取管線。

> **注意：** 首次管線執行可能需要較長時間，因為您的專案正在為 Vertex AI Pipelines 進行設定。

**步驟：**

**a. 執行管線：**
從儲存庫根目錄執行以下指令。請確保 `PROJECT_ID` 環境變數在您目前的 Shell 工作階段中仍已設定（如前置步驟中所設定）。

```bash
make data-ingestion
```

此指令會處理安裝相依性（如果需要透過 `make install`）並使用從您的專案設定中衍生的配置提交管線工作。傳遞給底層指令碼的特定參數取決於專案生成期間選擇的 `datastore_type`：
{%- if cookiecutter.datastore_type == "vertex_ai_search" %}
*   它將使用 `--data-store-id`、`--data-store-region` 等參數。

{
%- elif cookiecutter.datastore_type == "vertex_ai_vector_search" %}
*   它將使用 `--vector-search-index`、`--vector-search-index-endpoint`、`--vector-search-data-bucket-name` 等參數。
{%- endif %}
*   常見參數包括 `--project-id`、`--region`、`--service-account`、`--pipeline-root` 和 `--pipeline-name`。

**b. 管線排程：**

`make data-ingestion` 指令會觸發立即的管線執行。對於生產環境，底層的 `submit_pipeline.py` 指令碼也支援排程選項，帶有 `--schedule-only` 和 `--cron-schedule` 等旗標以供定期執行。

**c. 監控管線進度：**

提交後，管線的配置和執行狀態連結將印在控制台上。如需詳細監控，請使用 Google Cloud Console 中的 Vertex AI Pipelines 資訊主頁。

## 測試您的 RAG 應用程式

資料擷取管線成功完成後，您可以使用 {{ datastore_service_name }} 測試您的 RAG 應用程式。
{%- if cookiecutter.datastore_type == "vertex_ai_search" %}
> **疑難排解：** 如果在首次資料擷取後遇到錯誤 `"google.api_core.exceptions.InvalidArgument: 400 The embedding field path: embedding not found in schema"`，請稍候幾分鐘再試一次。此延遲讓 Vertex AI Search 能完整索引已擷取的資料。
{%- endif %}