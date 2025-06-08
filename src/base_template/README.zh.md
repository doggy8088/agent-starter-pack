# {{cookiecutter.project_name}}

{{cookiecutter.agent_description}}
使用 [`googleCloudPlatform/agent-starter-pack`](https://github.com/GoogleCloudPlatform/agent-starter-pack) 版本 `{{ cookiecutter.package_version }}` 建立的代理程式

## 專案結構

此專案的組織方式如下：

```
{{cookiecutter.project_name}}/
├── app/                 # 核心應用程式程式碼
│   ├── agent.py         # 主要代理程式邏輯
{%- if cookiecutter.deployment_target == 'cloud_run' %}
│   ├── server.py        # FastAPI 後端伺服器
{%- elif cookiecutter.deployment_target == 'agent_engine' %}
│   ├── agent_engine_app.py # Agent Engine 應用程式邏輯
{%- endif %}
│   └── utils/           # 公用函式和輔助程式
├── deployment/          # 基礎架構和部署指令碼
├── notebooks/           # 用於原型建立和評估的 Jupyter notebooks
├── tests/               # 單元、整合和負載測試
├── Makefile             # 常用指令的 Makefile
└── pyproject.toml       # 專案相依性與組態
```

## 要求

開始之前，請確保您已安裝：
- **uv**: Python 套件管理器 - [安裝](https://docs.astral.sh/uv/getting-started/installation/)
- **Google Cloud SDK**: 適用於 GCP 服務 - [安裝](https://cloud.google.com/sdk/docs/install)
- **Terraform**: 適用於基礎架構部署 - [安裝](https://developer.hashicorp.com/terraform/downloads)
- **make**: 建構自動化工具 - [安裝](https://www.gnu.org/software/make/) (大多數基於 Unix 的系統上已預先安裝)


## 快速入門 (本地測試)

安裝必要的套件並啟動本地開發環境：

```bash
make install && make playground
```

## 指令

| 指令              | 說明                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `make install`       | 使用 uv 安裝所有必要的相依性                                                  |
{%- if cookiecutter.deployment_target == 'cloud_run' %}
| `make playground`    | 啟動包含後端和前端的本地開發環境{%- if "adk" in cookiecutter.tags %} - 利用 `adk web` 指令。 {%- endif %}|
| `make backend`       | 將代理程式部署到 Cloud Run |
| `make local-backend` | 啟動本地開發伺服器 |
{%- if cookiecutter.deployment_target == 'cloud_run' %}
{%- if cookiecutter.agent_name == 'live_api' %}
| `make ui`       | 僅啟動 Agent Playground 前端 |
{%- endif %}
{%- endif %}
{%- elif cookiecutter.deployment_target == 'agent_engine' %}
| `make playground`    | 啟動 Streamlit 介面以在本地和遠端測試代理程式 |
| `make backend`       | 將代理程式部署到 Agent Engine |
{%- endif %}
| `make test`          | 執行單元和整合測試                                                              |
| `make lint`          | 執行程式碼品質檢查 (codespell, ruff, mypy)                                             |
| `make setup-dev-env` | 使用 Terraform 設定開發環境資源                                    |
{%- if cookiecutter.data_ingestion %}
| `make data-ingestion`| 在開發環境中執行資料攝取管線                                           |
{%- endif %}
| `uv run jupyter lab` | 啟動 Jupyter notebook                                                                     |

有關完整的指令選項和用法，請參閱 [Makefile](Makefile)。

{% if cookiecutter.agent_name == 'live_api' %}
## 用法
此範本採用「自帶代理程式」方法 - 您專注於 `app/agent.py` 中的業務邏輯，而範本則處理周邊元件 (UI、基礎架構、部署、監控)。

以下是本地開發的建議工作流程：

1.  **安裝相依性 (如果需要)：**
    ```bash
    make install
    ```

2.  **啟動後端伺服器：**
    開啟終端機並執行：
    ```bash
    make backend
    ```
當您看到 `INFO:     Application startup complete.` 時，後端已準備就緒。在啟動前端之前，請等待此訊息。

    <details>
    <summary><b>選用：使用 AI Studio / API Key 而非 Vertex AI</b></summary>

    依預設，後端使用 Vertex AI 和應用程式預設憑證。如果您偏好使用 Google AI Studio 和 API 金鑰：

    ```bash
    export VERTEXAI=false
    export GOOGLE_API_KEY="your-google-api-key" # 以您的實際金鑰取代
make backend
    ```
    請確保環境中的 `GOOGLE_API_KEY` 已正確設定。
    </details>
    <br>

3.  **啟動前端使用者介面 (UI)：**
    開啟*另一個*終端機並執行：
    ```bash
    make ui
    ```
    這將啟動 Streamlit 應用程式，它會連接到後端伺服器 (預設為 `http://localhost:8000`)。

4.  **互動與迭代：**
    *   在瀏覽器中開啟 Streamlit UI (通常是 `http://localhost:8501` 或 `http://localhost:3001`)。
*   點擊 UI 中的播放按鈕以連接到後端。
    *   與代理程式互動！嘗試以下提示，例如：*"利用你擁有的工具，在 MLOps 的情境下定義治理 (Governance)"*
    *   修改 `app/agent.py` 中的代理程式邏輯。當您儲存變更時，後端伺服器 (使用 `uvicorn --reload` 的 FastAPI) 應會自動重新啟動。如果需要查看行為變更，請重新整理前端。

<details>
<summary><b>Cloud Shell 用法</b></summary>

若要使用 Google Cloud Shell 執行代理程式：
1.  **啟動前端：**
    在 Cloud Shell 分頁中，執行：
    ```bash
    make ui
    ```
    如果 3000 埠被佔用，接受提示使用不同的埠。點擊 `localhost:PORT` 連結以進行網路預覽。

2.  **啟動後端：**
    開啟*新的* Cloud Shell 分頁。設定您的專案：`gcloud config set project [PROJECT_ID]`。然後執行：
    ```bash
    make backend
    ```

3.  **設定後端網路預覽：**
使用 Cloud Shell 網路預覽功能來公開 8000 埠。將預設埠從 8080 變更為 8000。請參閱 [Cloud Shell 網路預覽文件](https://cloud.google.com/shell/docs/using-web-preview#preview_the_application)。

4.  **連接前端到後端：**
    *   複製後端網路預覽生成的 URL (例如，`https://8000-cs-....cloudshell.dev/`)。
    *   將此 URL 貼入前端 UI 設定 (在第一個分頁中) 的「伺服器 URL」欄位。
*   點擊「播放按鈕」以連接。

*   **注意：** 由於預覽 URL 之間的跨域問題，前端的回饋功能在 Cloud Shell 中可能無法可靠運作。
</details>

</details>
{%- else %}
## 用法

此範本遵循「攜帶您自己的代理程式」方法 —— 您專注於您的業務邏輯，而範本處理所有其他事項 (UI、基礎設施、部署、監控)。
1. **原型：** 使用 `notebooks/` 中的入門筆記本作為指南，建構您的生成式 AI 代理程式。使用 Vertex AI 評估來評估效能。
2. **整合：** 透過編輯 `app/agent.py` 將您的代理程式匯入應用程式中。
3. **測試：** 使用 `make playground` 透過 Streamlit 練習場探索您的代理程式功能。練習場提供聊天歷史記錄、使用者回饋和各種輸入類型等功能，並會在程式碼變更時自動重新載入您的代理程式。
4. **部署：** 設定並啟動 CI/CD 管道，並根據需要自訂測試。有關詳細說明，請參閱[部署部分](#deployment)。為了簡化基礎設施部署，只需執行 `uvx agent-starter-pack setup-cicd`。查看 [`agent-starter-pack setup-cicd` CLI 命令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。
5. **監控：** 使用 Cloud Logging、Tracing 和 Looker Studio 資訊主頁追蹤效能並收集深入解析，以便對您的應用程式進行迭代。
{% endif %}

## 部署

> **注意：** 為了簡化使用 Terraform 部署整個 CI/CD 管道和基礎設施的一鍵式部署，您可以使用 [`agent-starter-pack setup-cicd` CLI 命令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。

### 開發環境
您可以使用以下命令將部署測試到開發環境：

```bash
gcloud config set project <your-dev-project-id>
make backend
```
{% if cookiecutter.agent_name == 'live_api' %}
**本機存取已部署的後端：**

若要將您的本機前端 (`make ui`) 連接到部署在 Cloud Run 上的後端，請使用 `gcloud` 代理：

1.  **啟動代理：**
    ```bash
    # 替換為您實際的服務名稱、專案和區域
gcloud run services proxy gemini-agent-service --port 8000 --project $PROJECT_ID --region $REGION
    ```
    保持此終端機執行。

2.  **連接前端：** 您已部署的後端現在可在 `http://localhost:8000` 進行本機存取。將您的 Streamlit UI 指向此位址。
{%- endif %}

此儲存庫包含用於設定開發 Google Cloud 專案的 Terraform 配置。
請參閱 [deployment/README.md](deployment/README.md) 以獲取說明。

### 生產部署
此儲存庫包含用於設定正式版 Google Cloud 專案的 Terraform 配置。請參閱 [deployment/README.md](deployment/README.md) 以取得如何部署基礎設施和應用程式的詳細指示。

{% if cookiecutter.agent_name != 'live_api' %}
## 監控與可觀測性
> 您可以使用 [此 Looker Studio 資訊主頁]({%- if "adk" in cookiecutter.tags %}https://lookerstudio.google.com/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC{%- else %}https://lookerstudio.google.com/c/reporting/fa742264-4b4b-4c56-81e6-a667dd0f853f/page/tEnnC{%- endif %}
) 範本，用於視覺化記錄在 BigQuery 中的事件。請參閱「設定指示」分頁以開始使用。
此應用程式使用 OpenTelemetry 實現全面可觀測性，所有事件都會傳送至 Google Cloud Trace 和 Logging 進行監控，並傳送至 BigQuery 進行長期儲存。
{%- endif %}