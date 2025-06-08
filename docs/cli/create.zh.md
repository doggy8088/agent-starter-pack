# `create`

Agent Starter Pack 提供 CLI 命令，協助您建立及管理 AI 代理程式專案。

## 建立命令

`create` 命令可協助您從範本建立新的 GCP 型 AI 代理程式專案。

```bash
agent-starter-pack create PROJECT_NAME [OPTIONS]
```

### 引數

- `PROJECT_NAME`：新代理程式專案目錄的名稱，以及資源命名的基礎。
  *注意：此名稱將轉換為小寫，且必須少於或等於 26 個字元。*

### 選項
如果未透過命令列提供，將以互動方式提示下列選項：
- `--agent`、`-a`：要使用的代理程式名稱或編號。如果省略，則列出所有可用的代理程式。
- `--deployment-target`、`-d`：部署目標 (`agent_engine` 或 `cloud_run`)。如果省略，則會提示輸入。
- `--datastore`、`-ds`：RAG 代理程式的資料儲存區 (`vertex_ai_search` 或 `vertex_ai_vector_search`)。如果指定 `--include-data-ingestion`，或所選代理程式 (例如 `agentic_rag`) 需要資料擷取且省略此選項，則會提示輸入。
- `--region`：部署的 GCP 區域 (預設值：`us-central1`)。如果未指定且未使用 `--auto-approve`，則會提示確認。

GCP 帳戶和專案 ID 會自動偵測 (使用您目前的 `gcloud config` 設定)。除非使用 `--auto-approve`，否則系統會提示您確認或變更這些資訊。

其他選項：
- `--include-data-ingestion`、`-i`：包含資料擷取管線元件 (某些代理程式，例如 `agentic_rag` 需要此元件，並會自動啟用)。如果手動指定但未搭配 `--datastore`，則會提示您選擇一個。
- `--debug`：啟用偵錯記錄。
- `--output-dir`、`-o`：專案的輸出目錄 (預設值：目前目錄)。
- `--auto-approve`：跳過 GCP 憑證和區域的互動式確認提示。
- `--skip-checks`：跳過 `uv` 安裝、GCP 驗證和 Vertex AI 連線的驗證檢查。

### 使用範例

```bash
# 以互動方式建立新專案
agent-starter-pack create my-agent-project
# 建立具有特定代理程式、部署目標、區域，並包含 Vertex AI Search 資料擷取功能
agent-starter-pack create my-agent-project -a agentic_rag -d cloud_run --region europe-west1 -i -ds vertex_ai_search

# 無需互動提示即可建立 (使用偵測到的 GCP 憑證)
agent-starter-pack create my-other-agent -a chat_agent -d agent_engine --auto-approve

# 在特定輸出目錄中建立
agent-starter-pack create my-specific-loc-agent -o ./my-agents/
```