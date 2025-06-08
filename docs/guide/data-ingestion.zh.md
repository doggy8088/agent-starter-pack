# RAG 的資料攝取管線

Agent Starter Pack 簡化了將資料攝取功能整合到您的代理程式專案中。這對於需要文件處理與檢索的代理程式特別有用，例如檢索增強生成 (RAG) 應用程式。

## 總覽

資料攝取自動化以下步驟：

-   從各種資料來源載入資料。
-   處理並將文件分塊。
-   使用 Vertex AI 生成嵌入。
-   將處理過的資料和嵌入儲存至 **Vertex AI Search** 或 **Vertex AI Vector Search**。
-   排程定期資料更新。
## 何時納入資料攝取功能

若有以下情況，請考慮納入資料攝取功能：

-   您的代理程式需要搜尋或參考大量文件。
-   您正在開發基於 RAG 的應用程式。
-   您的代理程式知識庫需要定期更新。
-   您希望代理程式的內容保持最新且可搜尋。

## 使用方式

### 建立專案
在建立專案時，可透過兩種方式納入資料攝取功能：

1.  **自動納入**: 部分代理程式（例如：為 RAG 設計的 `agentic_rag`）因其性質會自動納入。如果未指定，系統會提示您選擇一個資料儲存區 (`vertex_ai_search` 或 `vertex_ai_vector_search`)。

2.  **選擇性納入**: 對於其他代理程式，使用 `--include-data-ingestion` 旗標來新增，並使用 `--datastore`（或 `-ds`）指定所需的資料儲存區：

    ```bash
    # 使用 Vertex AI Search
    agent-starter-pack create my-agent-project --include-data-ingestion -ds vertex_ai_search

    # 使用 Vertex AI Vector Search
    agent-starter-pack create my-agent-project --include-data-ingestion -ds vertex_ai_vector_search
    ```
    如果在使用 `--include-data-ingestion` 時省略 `--datastore`，系統會提示您選擇一個。

### 基礎設施設定

Terraform IaC 會根據您選擇的資料儲存區來配置必要的基礎設施：
-   **Vertex AI Search**: 資料儲存區。
-   **Vertex AI Vector Search**: 索引、索引端點，以及用於暫存資料的儲存桶。
-   必要的服務帳戶和權限。
-   用於管線產物的儲存桶。
-   BigQuery 資料集（如適用）。

## 開始使用

1.  建立您的專案並納入資料攝取功能，同時指定您的資料儲存區：

    ```bash
    # Vertex AI Search 範例
    agent-starter-pack create my-project -ds vertex_ai_search
    # Vertex AI Vector Search 範例
    agent-starter-pack create my-project -ds vertex_ai_vector_search
    ```

2.  請依照生成的 `data_ingestion/README.md` 中的設定指南進行操作。在執行資料管線之前，請部署 Terraform 基礎設施（至少在您的開發專案中）。

## 了解更多

-   [Vertex AI Pipelines](https://cloud.google.com/vertex-ai/docs/pipelines/introduction) 用於管線管理。
-   [Vertex AI Search documentation](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) 用於搜尋功能。
-   [Vertex AI Vector Search documentation](https://cloud.google.com/vertex-ai/docs/vector-search/overview) 用於向量資料庫功能。