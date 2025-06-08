# `建立`

代理程式啟動套件提供命令列指令，協助您建立與管理 AI 代理專案。

## 建立指令

`建立` 指令協助您從範本建立新的以 GCP 為基礎的 AI 代理專案。

```bash
agent-starter-pack create PROJECT_NAME [OPTIONS]
```

### 引數

- `PROJECT_NAME`：新代理專案目錄的名稱，以及資源命名的基礎。
  *注意：此名稱將轉換為小寫，且必須少於 26 個字元。*

### 選項

如果未透過命令列提供，將會互動式地提示下列選項：
- `--agent`, `-a`：要使用的代理名稱或編號。如果省略，則列出可用的代理。
- `--deployment-target`, `-d`：部署目標 (`agent_engine` 或 `cloud_run`)。如果省略，則會提示。
- `--datastore`, `-ds`：RAG 代理的資料儲存庫 (`vertex_ai_search` 或 `vertex_ai_vector_search`)。如果指定 `--include-data-ingestion`，或如果所選代理 (例如 `agentic_rag`) 需要資料擷取，且此選項被省略，則會提示。
- `--region`：GCP 部署區域 (預設值：`us-central1`)。如果未指定且未使用 `--auto-approve`，則會提示確認。
GCP 帳戶和專案 ID 會自動偵測 (使用您目前的 `gcloud config` 設定)。除非使用 `--auto-approve`，否則系統會提示您確認或更改。

其他選項：
- `--include-data-ingestion`, `-i`：包含資料擷取管線元件 (某些代理程式，例如 `agentic_rag`，需要此項並會自動啟用)。如果手動指定但未指定 `--datastore`，系統會提示您選擇一個。
- `--debug`：啟用偵錯記錄。
- `--output-dir`, `-o`：專案的輸出目錄 (預設值：目前目錄)。
- `--auto-approve`：跳過 GCP 憑證和區域的互動式確認提示。
- `--skip-checks`：跳過 `uv` 安裝、GCP 驗證和 Vertex AI 連線的驗證檢查。

### 使用範例

```bash
# 互動式地建立新專案
agent-starter-pack create my-agent-project

# 使用特定代理、部署目標、區域，並包含 Vertex AI Search 的資料擷取來建立
agent-starter-pack create my-agent-project -a agentic_rag -d cloud_run --region europe-west1 -i -ds vertex_ai_search

# 無需互動式提示建立 (使用偵測到的 GCP 憑證)
agent-starter-pack create my-other-agent -a chat_agent -d agent_engine --auto-approve

# 在特定輸出目錄中建立
agent-starter-pack create my-specific-loc-agent -o ./my-agents/
