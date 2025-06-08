# 🚀 代理程式入門套件

![版本](https://img.shields.io/pypi/v/agent-starter-pack?color=blue) [![1 分鐘影片概述](https://img.shields.io/badge/1--Minute%20Overview-gray)](https://youtu.be/jHt-ZVD660g) [![文件](https://img.shields.io/badge/Documentation-gray)](https://googlecloudplatform.github.io/agent-starter-pack/) <a href="https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2FGoogleCloudPlatform%2Fagent-starter-pack%2Ftree%2Fmain%2Fsrc%2Fresources%2Fidx">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.firebasestudio.dev/btn/try_light_20.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.firebasestudio.dev/btn/try_dark_20.svg">
    <img
      height="20"
      alt="在 Firebase Studio 中試用"
      src="https://cdn.firebasestudio.dev/btn/try_blue_20.svg">
  </picture>
</a> [![在 Cloud Shell 中啟動](https://img.shields.io/badge/Launch-in_Cloud_Shell-white)](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Feliasecchig%2Fasp-open-in-cloud-shell&cloudshell_print=open-in-cs) ![星號](https://img.shields.io/github/stars/GoogleCloudPlatform/agent-starter-pack?color=yellow)


`agent-starter-pack` 是為 Google Cloud 建構的一組生產級生成式 AI 代理程式模板。 <br>
它透過提供全面的生產級解決方案來加速開發，解決建構和部署生成式 AI 代理程式時的常見挑戰（部署與操作、評估、自訂、可觀測性）。

| ⚡️ 啟動 | 🧪 實驗  | ✅ 部署 | 🛠️ 自訂 |
|---|---|---|---|
| [預建代理程式模板](./agents/) (ReAct、RAG、多代理程式、即時 API)。 | [Vertex AI 評估](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-overview) 以及互動式實驗場。 | 生產級基礎設施具備[監控、可觀測性](https://googlecloudplatform.github.io/agent-starter-pack/guide/observability)，以及在 [Cloud Run](https://cloud.google.com/run) 或 [Agent Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview) 上的 [CI/CD](https://googlecloudplatform.github.io/agent-starter-pack/guide/deployment)。 | 根據您的需求擴展和自訂模板。 |
---
 
## ⚡ 1 分鐘快速入門

準備好建構您的 AI 代理程式了嗎？只需執行此指令：

```bash
# 建立並啟用 Python 虛擬環境
python -m venv .venv && source .venv/bin/activate

# 安裝代理程式入門套件
pip install agent-starter-pack

# 建立新代理程式專案
agent-starter-pack create my-awesome-agent
```

**就這樣！** 您現在擁有一個功能齊全的代理程式專案—包括後端、前端和部署基礎設施—準備好供您探索和自訂。
請參閱[安裝指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/installation)以獲取更多選項，或在 [Firebase Studio](https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2FGoogleCloudPlatform%2Fagent-starter-pack%2Ftree%2Fmain%2Fsrc%2Fresources%2Fidx) 或 [Cloud Shell](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Feliasecchig%2Fasp-open-in-cloud-shell&cloudshell_print=open-in-cs) 中零設定試用。

---

 🆕 此入門套件完全支援 Agent Engine，這是一個用於部署代理程式的全新完全託管解決方案。只需執行此指令即可開始：

```bash
agent-starter-pack create my-agent -d agent_engine -a adk_base
```

*請參閱[完整選項列表](https://googlecloudplatform.github.io/agent-starter-pack/cli/create)以獲取詳細資訊。*

## 🤖 代理程式

| 代理程式名稱                  | 說明                                                                                                                       |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `adk_base`      | 一個使用 Google [Agent Development Kit](https://github.com/google/adk-python) 實作的基礎 ReAct 代理程式 |
| `agentic_rag` | 用於文件檢索和問答的 RAG 代理。支援 [Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) 和 [向量搜尋](https://cloud.google.com/vertex-ai/docs/vector-search/overview)。 |
| `langgraph_base_react` | 一個使用 LangGraph 實作基本 ReAct 代理的代理 |
| `crewai_coding_crew` | 一個使用 CrewAI 實作的多代理系統，旨在支援程式設計活動 |
| `live_api` | 一個由 Gemini 提供支援的即時多模態 RAG 代理，支援音訊/影片/文字聊天，並使用向量資料庫支援回應 |

**更多代理即將推出！** 我們正在持續擴展我們的 [代理函式庫](https://googlecloudplatform.github.io/agent-starter-pack/agents/overview)。您是否對某種特定代理類型有想法？[將其作為功能請求提出議題！](https://github.com/GoogleCloudPlatform/agent-starter-pack/issues/new?labels=enhancement)

**🔍 ADK 範例**

想探索更多 ADK 範例？請查看 [ADK 範例儲存庫](https://github.com/google/adk-samples) 以獲取更多範例和使用案例，展示 ADK 的功能。

#### 額外功能

`agent-starter-pack` 提供兩個主要功能，可加速並簡化您的代理開發：
- **🔄 [CI/CD 自動化 (實驗性)](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd)** - 一個指令即可為所有環境設定完整的 GitHub + Cloud Build 管道
- **📥 [用於 RAG 的 Terraform/CI-CD 資料管道](https://googlecloudplatform.github.io/agent-starter-pack/guide/data-ingestion)** - 將資料管道無縫整合到您的代理系統中，以處理 RAG 的嵌入。支援 [Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) 和 [向量搜尋](https://cloud.google.com/vertex-ai/docs/vector-search/overview)。


## 高階架構

此入門套件涵蓋代理開發的所有層面，從原型設計和評估到部署和監控。

![高階架構](docs/images/ags_high_level_architecture.png "架構")

---

## 🔧 要求

- Python 3.10+
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (用於部署)


## 📚 文件

請造訪我們的 [文件網站](https://googlecloudplatform.github.io/agent-starter-pack/) 以獲取全面的指南和參考資料！

- [入門指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/getting-started) - agent-starter-pack 的第一步
- [安裝指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/installation) - 設定您的環境
- [部署指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/deployment) - 將您的代理投入生產環境
- [代理模板概覽](https://googlecloudplatform.github.io/agent-starter-pack/agents/overview) - 探索可用的代理模式
- [CLI 參考](https://googlecloudplatform.github.io/agent-starter-pack/cli/) - 命令列工具文件


### 影片導覽：

- **[探索 Agent Starter Pack](https://www.youtube.com/watch?v=9zqwym-N3lg)**: 一個全面的指南，展示如何使用 Agent Starter Pack 快速部署 AI 代理，涵蓋架構、模板和逐步部署。

- **[6 分鐘介紹](https://www.youtube.com/live/eZ-8UQ_t4YM?feature=shared&t=2791)** (2024 年 4 月): 解釋 Agent Starter Pack 並展示其主要功能。Kaggle GenAI 密集課程的一部分。

- **[120 分鐘直播展示](https://www.youtube.com/watch?v=yIRIT_EtALs&t=235s)** (2025 年 3 月 6 日): 觀看我們如何在 30 分鐘內使用 `agent-starter-pack` 建立 3 個代理！


正在尋找 Google Cloud 上更多關於生成式 AI 的範例和資源？請查看 [GoogleCloudPlatform/generative-ai](https://github.com/GoogleCloudPlatform/generative-ai) 儲存庫，獲取筆記本、程式碼範例等！

## 貢獻

歡迎提供意見！請參閱[貢獻指南](CONTRIBUTING.md)。

## 意見回饋

我們重視您的意見！您的意見回饋有助於我們改進此入門套件，並使其對社群更有用。

### 取得協助

如果您遇到任何問題或有特定建議，請先考慮在我們的 GitHub 儲存庫上[提出問題](https://github.com/GoogleCloudPlatform/generative-ai/issues)。

### 分享您的經驗

對於其他類型的意見回饋，或者如果您想分享使用此入門套件的正面經驗或成功案例，我們很樂意聽取您的意見！您可以透過 <a href="mailto:agent-starter-pack@google.com">agent-starter-pack@google.com</a> 與我們聯絡。

感謝您的貢獻！

## 免責聲明

此儲存庫僅供展示用途，並非 Google 官方支援的產品。

## 服務條款

agent-starter-pack 範本化 CLI 和此入門套件中的範本會利用 Google Cloud API。當您使用此入門套件時，您將在自己的 Google Cloud 專案中部署資源，並將對這些資源負責。請參閱 [Google Cloud 服務條款](https://cloud.google.com/terms/service-terms) 以取得與這些 API 相關的服務條款詳細資訊。
