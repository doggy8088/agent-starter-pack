# RAG 的資料引入管線

Agent Starter Pack 簡化了將資料引入整合到您的代理程式專案中。這對於需要文件處理和檢索的代理程式特別有用，例如檢索增強生成 (RAG) 應用程式。

## 概述

資料引入自動化了：

-   從多種資料來源載入資料。
-   處理和分塊文件。
-   使用 Vertex AI 生成嵌入向量。
-   將處理過的資料和嵌入向量儲存到 **Vertex AI Search** 或 **Vertex AI Vector Search** 中。
-   排程定期資料更新。

## 何時納入資料引入

在下列情況下考慮資料引入：

-   您的代理程式需要搜尋或參考大量文件。
-   您正在開發基於 RAG 的應用程式。
-   您的代理程式知識庫需要定期更新。
-   您希望保持代理程式內容的時效性和可搜尋性。

## 使用方式

### 專案建立

在專案建立期間，可以透過兩種方式納入資料引入功能：

1.  **自動納入**：某些代理程式（例如：為 RAG 設計的 `agentic_rag`）因其性質會自動納入此功能。如果未指定，系統會提示您選擇一個資料儲存區 (`vertex_ai_search` 或 `vertex_ai_vector_search`)。

2.  **選擇性納入**：對於其他代理程式，請使用 `--include-data-ingestion` 旗標並透過 `--datastore`（或 `-ds`）指定所需的資料儲存區來新增它：

    ```bash
    # 使用 Vertex AI Search
    agent-starter-pack create my-agent-project --include-data-ingestion -ds vertex_ai_search

    # 使用 Vertex AI Vector Search
    agent-starter-pack create my-agent-project --include-data-ingestion -ds vertex_ai_vector_search
    ```
    如果在啟用 `--include-data-ingestion` 時省略 `--datastore`，系統會提示您選擇一個。

### 基礎設施設定
Terraform IaC 會根據您選擇的資料儲存區來配置所需的基礎設施：

-   **Vertex AI Search**：資料儲存區。
-   **Vertex AI Vector Search**：索引、索引端點，以及用於暫存資料的儲存空間 (Bucket)。
-   必要的服務帳戶和權限。
-   用於管線成品 (artifact) 的儲存空間 (Bucket)。
-   BigQuery 資料集 (如果適用)。

## 開始使用

1.  建立您的專案並納入資料引入功能，同時指定您的資料儲存區：

    ```bash
    # 使用 Vertex AI Search 的範例
    agent-starter-pack create my-project -ds vertex_ai_search

    # 使用 Vertex AI Vector Search 的範例
    agent-starter-pack create my-project -ds vertex_ai_vector_search
    ```

2.  遵循所產生 `data_ingestion/README.md` 中的設定指示。在執行資料管線之前，部署 Terraform 基礎設施（至少在您的開發專案中）。

## 了解更多

-   [Vertex AI Pipelines](https://cloud.google.com/vertex-ai/docs/pipelines/introduction) 用於管線管理。
-   [Vertex AI Search 文件](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) 用於搜尋功能。
-   [Vertex AI Vector Search 文件](https://cloud.google.com/vertex-ai/docs/vector-search/overview) 用於向量資料庫功能。
