# {{cookiecutter.project_name}}

{{cookiecutter.agent_description}}
利用 [`googleCloudPlatform/agent-starter-pack`](https://github.com/GoogleCloudPlatform/agent-starter-pack) 版本 `{{ cookiecutter.package_version }}` 建立的代理

## 專案結構

此專案的組織結構如下：

```
{{cookiecutter.project_name}}/
├── app/                 # 核心應用程式程式碼
│   ├── agent.py         # 主要代理邏輯
{%- if cookiecutter.deployment_target == 'cloud_run' %}
│   ├── server.py        # FastAPI 後端伺服器
{%- elif cookiecutter.deployment_target == 'agent_engine' %}
│   ├── agent_engine_app.py # Agent Engine 應用程式邏輯
{%- endif %}
│   └── utils/           # 公用函式與輔助工具
├── deployment/          # 基礎設施與部署指令碼
├── notebooks/           # 用於原型建立與評估的 Jupyter Notebook
├── tests/               # 單元、整合與負載測試
├── Makefile             # Makefile 用於常用指令
└── pyproject.toml       # 專案相依性與組態
```

## 必要條件

開始之前，請確保您已具備：
- **uv**: Python 套件管理工具 - [安裝](https://docs.astral.sh/uv/getting-started/installation/)
- **Google Cloud SDK**: 適用於 GCP 服務 - [安裝](https://cloud.google.com/sdk/docs/install)
- **Terraform**: 用於基礎設施部署 - [安裝](https://developer.hashicorp.com/terraform/downloads)
- **make**: 建構自動化工具 - [安裝](https://www.gnu.org/software/make/) (大多數基於 Unix 的系統已預先安裝)


## 快速入門 (本地測試)

安裝必要的套件並啟動本地開發環境：

```bash
make install && make playground
```

## 指令

| 指令                 | 描述                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `make install`       | 使用 uv 安裝所有必要的相依性                                                  |
{%- if cookiecutter.deployment_target == 'cloud_run' %}
| `make playground`    | 啟動包含後端和前端的本地開發環境{%- if "adk" in cookiecutter.tags %} - 利用 `adk web` 指令。 {%- endif %}|
| `make backend`       | 將代理部署到 Cloud Run |
| `make local-backend` | 啟動本地開發伺服器 |
{%- if cookiecutter.deployment_target == 'cloud_run' %}
{%- if cookiecutter.agent_name == 'live_api' %}
| `make ui`       | 僅啟動 Agent Playground 前端 |
{%- endif %}
{%- endif %}
{%- elif cookiecutter.deployment_target == 'agent_engine' %}
| `make playground`    | 啟動 Streamlit 介面，用於本地和遠端測試代理 |
| `make backend`       | 將代理部署到 Agent Engine |
{%- endif %}
| `make test`          | 執行單元和整合測試                                                              |
| `make lint`          | 執行程式碼品質檢查 (codespell, ruff, mypy)                                             |
| `make setup-dev-env` | 使用 Terraform 設定開發環境資源                                    |
{%- if cookiecutter.data_ingestion %}
| `make data-ingestion`| 在開發環境中執行資料擷取管線                                           |
{%- endif %}
| `uv run jupyter lab` | 啟動 Jupyter notebook                                                                     |

有關完整的指令選項和用法，請參閱 [Makefile](Makefile)。

{% if cookiecutter.agent_name == 'live_api' %}
## 用法

此模板採用「自帶代理」的方法 - 您專注於 `app/agent.py` 中的業務邏輯，而模板則處理周邊元件 (UI、基礎設施、部署、監控)。

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
    當您看到 `INFO:     Application startup complete.` 時，後端已準備就緒。請等待此訊息出現後再啟動前端。

    <details>
    <summary><b>選用：使用 AI Studio / API Key 而非 Vertex AI</b></summary>

    依預設，後端使用 Vertex AI 和應用程式預設憑證。如果您偏好使用 Google AI Studio 和 API 金鑰：

    ```bash
    export VERTEXAI=false
    export GOOGLE_API_KEY="your-google-api-key" # 請替換為您的實際金鑰
    make backend
    ```
    確保您的環境中正確設定了 `GOOGLE_API_KEY`。
    </details>
    <br>

3.  **啟動前端使用者介面：**
    開啟*另一個*終端機並執行：
    ```bash
    make ui
    ```
    這會啟動 Streamlit 應用程式，該應用程式預設會連接到後端伺服器 (`http://localhost:8000`)。
    *   在使用者介面中點擊播放按鈕以連接到後端。
    *   與代理互動！嘗試以下提示：*"使用您擁有的工具，在 MLOps 環境中定義治理"*
    *   修改 `app/agent.py` 中的代理邏輯。後端伺服器（FastAPI 搭配 `uvicorn --reload`）在您儲存變更時應自動重新啟動。如有需要，請重新整理前端以查看行為變化。

<details>
<summary><b>Cloud Shell 使用方式</b></summary>

若要使用 Google Cloud Shell 執行代理：
1.  **啟動前端：**
    在 Cloud Shell 分頁中，執行：
    ```bash
    make ui
    ```
    如果連接埠 3000 忙碌，請接受提示以使用其他連接埠。點擊 `localhost:PORT` 連結以進行網頁預覽。

2.  **啟動後端：**
    開啟*新的* Cloud Shell 分頁。設定您的專案：`gcloud config set project [PROJECT_ID]`。然後執行：
    ```bash
    make backend
    ```

3.  **配置後端網頁預覽：**
    使用 Cloud Shell 網頁預覽功能來公開連接埠 8000。將預設連接埠從 8080 變更為 8000。請參閱 [Cloud Shell 網頁預覽文件](https://cloud.google.com/shell/docs/using-web-preview#preview_the_application)。

4.  **連接前端到後端：**
    *   複製後端網頁預覽產生的 URL (例如，`https://8000-cs-....cloudshell.dev/`)。
    *   將此 URL 貼到前端使用者介面設定中的「伺服器 URL」欄位（在第一個分頁中）。
    *   點擊「播放按鈕」以連接。

*   **注意：** 由於預覽 URL 之間的跨來源問題，前端中的意見回饋功能在 Cloud Shell 中可能無法可靠運作。
</details>

</details>
{%- else %}
## 使用方式

此範本遵循「自帶代理」的方法 — 您專注於業務邏輯，而範本處理其他所有內容（使用者介面、基礎設施、部署、監控）。

1. **原型開發：** 使用 `notebooks/` 中的入門筆記本作為指南，建構您的生成式 AI 代理。使用 Vertex AI 評估來評估效能。
2. **整合：** 透過編輯 `app/agent.py` 將您的代理匯入應用程式中。
3. **測試：** 使用 `make playground` 搭配 Streamlit 遊樂場探索您的代理功能。遊樂場提供聊天記錄、使用者意見回饋和各種輸入類型等功能，並在程式碼變更時自動重新載入您的代理。
4. **部署：** 設定並啟動 CI/CD 管道，並根據需要自訂測試。請參閱 [部署部分](#deployment) 以取得完整說明。為了簡化基礎設施部署，只需執行 `uvx agent-starter-pack setup-cicd`。請查看 [`agent-starter-pack setup-cicd` CLI 命令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。
5. **監控：** 使用 Cloud Logging、Tracing 和 Looker Studio 資訊主頁追蹤效能並收集深入分析，以對應用程式進行迭代。
{% endif %}

## 部署

> **注意：** 若要使用 Terraform 簡化整個 CI/CD 管道和基礎設施的單一命令部署，您可以使用 [`agent-starter-pack setup-cicd` CLI 命令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。

### 開發環境

您可以使用以下命令測試部署至開發環境：

```bash
gcloud config set project <your-dev-project-id>
make backend
```
{% if cookiecutter.agent_name == 'live_api' %}
**在本地存取已部署的後端：**

若要將您的本地前端（`make ui`）連接到部署在 Cloud Run 上的後端，請使用 `gcloud` 代理：

1.  **啟動代理：**
    ```bash
    # 請替換為您的實際服務名稱、專案和區域
    gcloud run services proxy gemini-agent-service --port 8000 --project $PROJECT_ID --region $REGION
    ```
    保持此終端機執行中。

2.  **連接前端：** 您已部署的後端現在可在本地透過 `http://localhost:8000` 存取。將您的 Streamlit 使用者介面指向此位址。
{%- endif %}

此儲存庫包含用於設定開發用 Google Cloud 專案的 Terraform 配置。
請參閱 [deployment/README.md](deployment/README.md) 以取得說明。

### 生產部署

此儲存庫包含 Terraform 配置，用於設定生產環境的 Google Cloud 專案。請參閱 [deployment/README.md](deployment/README.md) 以獲取部署基礎設施和應用程式的詳細說明。

{% if cookiecutter.agent_name != 'live_api' %}
## 監控與可觀察性
> 您可以使用 [此 Looker Studio 資訊主頁]({%- if "adk" in cookiecutter.tags %}https://lookerstudio.google.com/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC{%- else %}https://lookerstudio.google.com/c/reporting/fa742264-4b4b-4c56-81e6-a667dd0f853f/page/tEnnC{%- endif %}
) 範本來視覺化記錄在 BigQuery 中的事件。請參閱「設定說明」分頁以開始使用。

此應用程式使用 OpenTelemetry 實現全面的可觀察性，所有事件均會傳送至 Google Cloud Trace 和 Logging 進行監控，並傳送至 BigQuery 進行長期儲存。
{%- endif %}
