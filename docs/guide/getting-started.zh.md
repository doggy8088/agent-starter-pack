# 🚀 快速入門

本指南將快速引導您設定第一個代理程式專案。

**想要零設定？** 👉 [在 Firebase Studio 中試用](https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2FGoogleCloudPlatform%2Fagent-starter-pack%2Ftree%2Fmain%2Fsrc%2Fresources%2Fidx) 或在 [Cloud Shell 中試用](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Feliasecchig%2Fasp-open-in-cloud-shell&cloudshell_print=open-in-cs)
### 先決條件

**Python 3.10+** | **Google Cloud SDK** [安裝指南](https://cloud.google.com/sdk/docs/install) | **Terraform** [安裝指南](https://developer.hashicorp.com/terraform/downloads) | **`uv` (自動安裝)** [手動安裝指南](https://docs.astral.sh/uv/getting-started/installation/)

### 1. 安裝入門套件

```bash
# 建立並啟用 Python 虛擬環境 (建議)
python -m venv .venv
source .venv/bin/activate  # 在 Windows 上: .venv\Scripts\activate

# 安裝套件
pip install agent-starter-pack
```
請參閱[安裝指南](/guide/installation)以了解其他安裝方法。

### 2. 建立您的代理程式專案

執行 `create` 命令並依照提示操作：

```bash
agent-starter-pack create my-awesome-agent
```

此命令會：
*   讓您選擇代理程式模板 (例如，`adk_base`、`agentic_rag`)。
*   讓您選擇部署目標 (例如，`cloud_run`、`agent_engine`)。
*   生成完整的專案結構 (後端、選用前端、部署基礎設施)。

**範例：**

```bash
# 為 Cloud Run 建立 RAG 代理程式 (出現提示時選擇選項)
agent-starter-pack create my-rag-agent

# 直接為 Agent Engine 建立基礎 ADK 代理程式
agent-starter-pack create my-adk-agent -a adk_base -d agent_engine
```

### 3. 探索並在本機執行

```bash
cd my-awesome-agent && make install && make playground
```

在您的新專案目錄 (`my-awesome-agent`) 中，您會找到：

*   `app/`：後端代理程式程式碼。
*   `deployment/`：Terraform 基礎設施程式碼。
*   `tests/`：代理程式的單元和整合測試。
*   `notebooks/`：用於開始評估的 Jupyter notebooks。
*   `frontend/`：(如果適用) 用於與代理程式互動的 Web UI。
*   `README.md`：**針對專案的本機執行和部署說明。**
➡️ **請依照*您新專案的* `README.md` 中的說明在本機執行。**

### 後續步驟

您已準備就緒！請參閱[開發指南](/guide/development-guide)以了解擴展、自訂和部署代理程式的詳細說明。

- **新增資料 (RAG)：** 為基於知識的代理程式設定[資料擷取](/guide/data-ingestion)。
- **監控效能：** 探索[可觀測性](/guide/observability)功能以進行生產監控。
- **部署至生產環境：** 依照[部署指南](/guide/deployment)將您的代理程式部署到 Google Cloud。