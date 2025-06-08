# 🚀 代理程式入門套件

![Version](https://img.shields.io/pypi/v/agent-starter-pack?color=blue) [![1 分鐘影片概觀](https://img.shields.io/badge/1--Minute%20Overview-gray)](https://youtu.be/jHt-ZVD660g) [![文件](https://img.shields.io/badge/Documentation-gray)](https://googlecloudplatform.github.io/agent-starter-pack/) <a href="https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2FGoogleCloudPlatform%2Fagent-starter-pack%2Ftree%2Fmain%2Fsrc%2Fresources%2Fidx">
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
</a> [![在 Cloud Shell 中啟動](https://img.shields.io/badge/Launch-in_Cloud_Shell-white)](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Feliasecchig%2Fasp-open-in-cloud-shell&cloudshell_print=open-in-cs) ![Stars](https://img.shields.io/github/stars/GoogleCloudPlatform/agent-starter-pack?color=yellow)


`agent-starter-pack` 是為 Google Cloud 建構的一系列生產就緒生成式 AI 代理程式範本。 <br>
它透過提供全面、生產就緒的解決方案來加速開發，解決了在建構與部署 GenAI 代理程式時的常見挑戰（部署與操作、評估、客製化、可觀測性）。

| ⚡️ 啟動 | 🧪 實驗  | ✅ 部署 | 🛠️ 客製化 |
|---|---|---|---|
| [預建代理程式範本](./agents/) (ReAct, RAG, multi-agent, Live API)。 | [Vertex AI 評估](https://cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-overview) 和一個互動式操作區。 | 在 Cloud Run 或 Agent Engine 上，具備監控、可觀測性以及 [CI/CD](https://googlecloudplatform.github.io/agent-starter-pack/guide/deployment) 的生產就緒基礎架構。 | 根據您的需求擴展和客製化範本。 |
---
 
## ⚡ 1 分鐘快速入門

準備好建構您的 AI 代理程式了嗎？只需執行此指令：

```bash
# 建立並啟用 Python 虛擬環境
python -m venv .venv && source .venv/bin/activate

# 安裝代理程式入門套件
pip install agent-starter-pack

# 建立新的代理程式專案
agent-starter-pack create my-awesome-agent
```
**就這麼簡單！** 您現在擁有一個功能齊全的代理程式專案—包含後端、前端和部署基礎架構—可供您探索和客製化。
請參閱 [安裝指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/installation) 以取得更多選項，或在 [Firebase Studio](https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2FGoogleCloudPlatform%2Fagent-starter-pack%2Ftree%2Fmain%2Fsrc%2Fresources%2Fidx) 或 [Cloud Shell](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Feliasecchig%2Fasp-open-in-cloud-shell&cloudshell_print=open-in-cs) 中嘗試零設定。
---

 🆕 入門套件全面支援 Agent Engine，這是一個用於部署代理程式的全新全代管解決方案。只需執行此指令即可開始使用：

```bash
agent-starter-pack create my-agent -d agent_engine -a adk_base
```

*請參閱 [完整選項列表](https://googlecloudplatform.github.io/agent-starter-pack/cli/create) 以取得詳細資訊。*

## 🤖 代理程式
| 代理程式名稱                  | 說明                                                                                                                       |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `adk_base`      | 使用 Google 的 [代理程式開發工具包](https://github.com/google/adk-python) 實作的基礎 ReAct 代理程式 |
| `agentic_rag` | 用於文件檢索和問答的 RAG 代理。支援 [Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) 和 [Vector Search](https://cloud.google.com/vertex-ai/docs/vector-search/overview)。|
| `langgraph_base_react` | 使用 LangGraph 實作基礎 ReAct 代理的代理 |
| `crewai_coding_crew` | 使用 CrewAI 建立的多代理系統，旨在支援程式設計活動 |
| `live_api` | 由 Gemini 提供支援的即時多模態 RAG 代理，支援音訊/影片/文字聊天，並提供向量資料庫支援的回應 |

**更多代理即將推出！** 我們正在持續擴展我們的[代理函式庫](https://googlecloudplatform.github.io/agent-starter-pack/agents/overview)。心中有特定的代理類型嗎？[提出問題作為功能請求！](https://github.com/GoogleCloudPlatform/agent-starter-pack/issues/new?labels=enhancement)
**🔍 ADK 範例**

想探索更多 ADK 範例嗎？請查看 [ADK 範例儲存庫](https://github.com/google/adk-samples)，以獲取更多展示 ADK 功能的範例和使用案例。

#### 額外功能

`agent-starter-pack` 提供兩項關鍵功能，以加速並簡化您的代理開發：
- **🔄 [CI/CD 自動化 (實驗性)](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd)** - 一個指令即可為所有環境設定完整的 GitHub + Cloud Build 管線
- **📥 [RAG 資料管線與 Terraform/CI-CD](https://googlecloudplatform.github.io/agent-starter-pack/guide/data-ingestion)** - 將資料管線無縫整合到您的代理系統中，以處理 RAG 嵌入。支援 [Vertex AI Search](https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction) 和 [Vector Search](https://cloud.com/vertex-ai/docs/vector-search/overview)。


## 高階架構
此入門套件涵蓋代理開發的所有層面，從原型建構和評估到部署和監控。

![高階架構](docs/images/ags_high_level_architecture.png "架構")

---

## 🔧 要求

- Python 3.10+
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (用於部署)


## 📚 文件
造訪我們的[文件網站](https://googlecloudplatform.github.io/agent-starter-pack/)，獲取全面的指南和參考資料！

- [快速入門指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/getting-started) - agent-starter-pack 的第一步
- [安裝指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/installation) - 設定您的環境
- [部署指南](https://googlecloudplatform.github.io/agent-starter-pack/guide/deployment) - 將您的代理投入生產
- [代理範本總覽](https://googlecloudplatform.github.io/agent-starter-pack/agents/overview) - 探索可用的代理模式
- [CLI 參考](https://googlecloudplatform.github.io/agent-starter-pack/cli/) - 命令列工具文件


### 影片導覽：
- **[探索 Agent Starter Pack](https://www.youtube.com/watch?v=9zqwym-N3lg)**：一份全面的指南，示範如何使用 Agent Starter Pack 快速部署 AI 代理，內容涵蓋架構、範本和逐步部署。

- **[6 分鐘介紹](https://www.youtube.com/live/eZ-8UQ_t4YM?feature=shared&t=2791)** (2024 年 4 月)：解釋 Agent Starter Pack 並展示其主要功能。Kaggle GenAI 密集課程的一部分。
- **[120 分鐘直播展示](https://www.youtube.com/watch?v=yIRIT_EtALs&t=235s)** (2025 年 3 月 6 日)：觀看我們使用 `agent-starter-pack` 在 30 分鐘內建構 3 個代理！


尋找更多 Google Cloud 上生成式 AI 的範例和資源？請查看 [GoogleCloudPlatform/generative-ai](https://github.com/GoogleCloudPlatform/generative-ai) 儲存庫，獲取筆記本、程式碼範例等！

## 貢獻
歡迎投稿！請參閱[投稿指南](CONTRIBUTING.md)。

## 意見回饋

我們重視您的意見！您的意見回饋有助於我們改進這個入門套件，並使其對社群更有用。

### 取得協助

如果您遇到任何問題或有具體建議，請先考慮在我們的 GitHub 儲存庫上[提出問題](https://github.com/GoogleCloudPlatform/generative-ai/issues)。

### 分享您的經驗
對於其他類型的意見回饋，或者如果您想分享使用此入門套件的正面經驗或成功案例，我們很樂意聽取您的意見！您可以透過 <a href="mailto:agent-starter-pack@google.com">agent-starter-pack@google.com</a> 與我們聯絡。

感謝您的貢獻！

## 免責聲明

此儲存庫僅用於展示目的，並非 Google 官方支援的產品。

## 服務條款
agent-starter-pack 範本 CLI 和此入門套件中的範本利用 Google Cloud API。當您使用此入門套件時，您將在自己的 Google Cloud 專案中部署資源，並將對這些資源負責。請查閱[Google Cloud 服務條款](https://cloud.google.com/terms/service-terms)以獲取與這些 API 相關的服務條款詳細資訊。