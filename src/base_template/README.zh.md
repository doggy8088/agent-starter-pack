# {{cookiecutter.project_name}}

{{cookiecutter.agent_description}}
代理透過 [`googleCloudPlatform/agent-starter-pack`](https://github.com/GoogleCloudPlatform/agent-starter-pack) 版本 `{{ cookiecutter.package_version }}` 產生

## 專案結構

此專案結構如下：

```
{{cookiecutter.project_name}}/
├── app/                 # 核心應用程式程式碼
│   ├── agent.py         # 主要代理邏輯
{%- if cookiecutter.deployment_target == 'cloud_run' %}
│   ├── server.py        # FastAPI 後端伺服器
{%- elif cookiecutter.deployment_target == 'agent_engine' %}
│   ├── agent_engine_app.py # Agent Engine 應用程式邏輯
{%- endif %}
│   └── utils/           # 公用函式和輔助程式
├── deployment/          # 基礎架構和部署腳本
├── notebooks/           # 用於原型設計和評估的 Jupyter 筆記本
├── tests/               # 單元、整合和負載測試
├── Makefile             # 常用指令的 Makefile
└── pyproject.toml       # 專案相依性和組態
```

## 必要條件

開始之前，請確認您已具備：
- **uv**：Python 套件管理器 - [安裝](https://docs.astral.sh/uv/getting-started/installation/)
- **Google Cloud SDK**：適用於 GCP 服務 - [安裝](https://cloud.google.com/sdk/docs/install)
- **Terraform**：適用於基礎架構部署 - [安裝](https://developer.hashicorp.com/terraform/downloads)
- **make**：建構自動化工具 - [安裝](https://www.gnu.org/software/make/) (大多數基於 Unix 的系統預裝)


## 快速開始 (本地測試)

安裝所需套件並啟動本地開發環境：

```bash
make install && make playground
```

## 指令

| 指令              | 說明                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `make install`       | 使用 uv 安裝所有必要的相依性                                                  |
{%- if cookiecutter.deployment_target == 'cloud_run' %}
| `make playground`    | 啟動包含後端和前端的本地開發環境{%- if "adk" in cookiecutter.tags %} - 運用 `adk web` 指令。 {%- endif %}|
| `make backend`       | 將代理部署到 Cloud Run |
| `make local-backend` | 啟動本地開發伺服器 |
{%- if cookiecutter.deployment_target == 'cloud_run' %}
{%- if cookiecutter.agent_name == 'live_api' %}
| `make ui`       | 僅啟動代理測試場前端 |
{%- endif %}
{%- endif %}
{%- elif cookiecutter.deployment_target == 'agent_engine' %}
| `make playground`    | 啟動 Streamlit 介面以進行代理的本地和遠端測試 |
| `make backend`       | 將代理部署到 Agent Engine |
{%- endif %}
| `make test`          | 執行單元和整合測試                                                              |
| `make lint`          | 執行程式碼品質檢查 (codespell, ruff, mypy)                                             |
| `make setup-dev-env` | 使用 Terraform 設定開發環境資源                                    |
{%- if cookiecutter.data_ingestion %}
| `make data-ingestion`| 在開發環境中執行資料擷取管道                                           |
{%- endif %}
| `uv run jupyter lab` | 啟動 Jupyter 筆記本                                                                     |

如需完整的指令選項和用法，請參閱 [Makefile](Makefile)。

{% if cookiecutter.agent_name == 'live_api' %}
## 用法

此範本遵循「自帶代理」的方法 - 您專注於 `app/agent.py` 中的業務邏輯，範本則處理周邊元件 (UI、基礎架構、部署、監控)。

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
    當您看到 `INFO:     Application startup complete.` 時，表示後端已準備就緒。在啟動前端之前，請等待此訊息出現。

    <details>
    <summary><b>選用：使用 AI Studio / API Key 而非 Vertex AI</b></summary>

    預設情況下，後端使用 Vertex AI 和應用程式預設憑證。如果您偏好使用 Google AI Studio 和 API 金鑰：

    ```bash
    export VERTEXAI=false
    export GOOGLE_API_KEY="your-google-api-key" # 以您的實際金鑰取代
    make backend
    ```
    確保您的環境中已正確設定 `GOOGLE_API_KEY`。
    </details>
    <br>

3.  **啟動前端使用者介面：**
    開啟*另一個*終端機並執行：
    ```bash
    make ui
    ```
    這會啟動 Streamlit 應用程式，它會連線到後端伺服器 (預設為 `http://localhost:8000`)。

4.  **互動與迭代：**
    *   在您的瀏覽器中開啟 Streamlit UI (通常是 `http://localhost:8501` 或 `http://localhost:3001`)。
    *   點擊 UI 中的播放按鈕以連線到後端。
    *   與代理互動！嘗試提示，例如：*「使用您擁有的工具，在 MLOPs 的情境中定義治理」*
    *   修改 `app/agent.py` 中的代理邏輯。後端伺服器 (FastAPI 搭配 `uvicorn --reload`) 在您儲存變更時應自動重新啟動。如有需要，重新整理前端以查看行為變更。

<details>
<summary><b>Cloud Shell 使用方式</b></summary>

若要使用 Google Cloud Shell 執行代理：

1.  **啟動前端：**
    在 Cloud Shell 分頁中執行：
    ```bash
    make ui
    ```
    如果 3000 埠被佔用，請接受提示以使用其他埠。點擊 `localhost:PORT` 連結以進行網頁預覽。

2.  **啟動後端：**
    開啟*新的* Cloud Shell 分頁。設定您的專案：`gcloud config set project [PROJECT_ID]`。然後執行：
    ```bash
    make backend
    ```

3.  **設定後端網頁預覽：**
    使用 Cloud Shell 網頁預覽功能來公開 8000 埠。將預設埠從 8080 變更為 8000。請參閱 [Cloud Shell 網頁預覽說明文件](https://cloud.google.com/shell/docs/using-web-preview#preview_the_application)。

4.  **將前端連線到後端：**
    *   複製後端網頁預覽產生的 URL (例如：`https://8000-cs-....cloudshell.dev/`)。
    *   將此 URL 貼入前端 UI 設定 (在第一個分頁中) 的「伺服器 URL」欄位。
    *   點擊「播放按鈕」以連線。

*   **注意：** 由於預覽 URL 之間的跨來源問題，前端的意見回饋功能在 Cloud Shell 中可能無法可靠運作。
</details>

</details>
{%- else %}
## 使用方式

此範本採用「自帶代理」方法 - 您專注於您的業務邏輯，範本處理所有其他事物 (UI、基礎設施、部署、監控)。

1. **原型設計：** 使用 `notebooks/` 中的入門筆記本作為指南，建構您的生成式 AI 代理。使用 Vertex AI Evaluation 來評估效能。
2. **整合：** 透過編輯 `app/agent.py` 將您的代理匯入應用程式。
3. **測試：** 使用 `make playground` 透過 Streamlit playground 探索您的代理功能。playground 提供諸如聊天記錄、使用者意見回饋和各種輸入類型等功能，並在程式碼變更時自動重新載入您的代理。
4. **部署：** 設定並啟動 CI/CD 管線，並視需要自訂測試。請參閱[部署區段](#deployment)以取得完整說明。若要簡化基礎設施部署，只需執行 `uvx agent-starter-pack setup-cicd`。請查看 [`agent-starter-pack setup-cicd` CLI 指令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。
5. **監控：** 使用 Cloud Logging、Tracing 和 Looker Studio 資訊主頁追蹤效能並收集深入分析，以迭代您的應用程式。
{% endif %}

## 部署

> **注意：** 若要使用 Terraform 簡化單一指令部署整個 CI/CD 管線和基礎設施，您可以使用 [`agent-starter-pack setup-cicd` CLI 指令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。

### 開發環境

您可以使用以下指令測試部署至開發環境：

```bash
gcloud config set project <your-dev-project-id>
make backend
```
{% if cookiecutter.agent_name == 'live_api' %}
**在本機存取已部署的後端：**

若要將您的本機前端 (`make ui`) 連線到部署在 Cloud Run 上的後端，請使用 `gcloud` 代理：

1.  **啟動代理：**
    ```bash
    # 以您的實際服務名稱、專案和區域取代
    gcloud run services proxy gemini-agent-service --port 8000 --project $PROJECT_ID --region $REGION
    ```
    保持此終端機執行。

2.  **連線前端：** 您已部署的後端現在可以在本機透過 `http://localhost:8000` 存取。將您的 Streamlit UI 指向此位址。
{%- endif %}

儲存庫包含用於設定開發 Google Cloud 專案的 Terraform 設定。
請參閱 [deployment/README.md](deployment/README.md) 以取得說明。

### 正式發布部署

存放庫包含 Terraform 設定，用於設定正式版 Google Cloud 專案。請參閱 [deployment/README.md](deployment/README.md) 以取得部署基礎架構和應用程式的詳細說明。

{% if cookiecutter.agent_name != 'live_api' %}
## 監控與可觀察性
> 您可以使用 [此 Looker Studio 資訊主頁]({%- if "adk" in cookiecutter.tags %}https://lookerstudio.google.com/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC{%- else %}https://lookerstudio.google.com/c/reporting/fa742264-4b4b-4c56-81e6-a667dd0f853f/page/tEnnC{%- endif %}
) 範本，用於視覺化 BigQuery 中記錄的事件。請參閱「設定說明」分頁以開始使用。

此應用程式使用 OpenTelemetry 以實現全面的可觀察性，所有事件會傳送到 Google Cloud Trace 和 Logging 用於監控，並傳送到 BigQuery 進行長期儲存。
{%- endif %}
