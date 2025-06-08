# 部署 README.md

此資料夾包含基礎設施即程式碼 (IaC) 和 CI/CD 管道設定，用於在 Google Cloud 上部署對話式生成式 AI 應用程式。

此應用程式利用 [**Terraform**](http://terraform.io) 定義及佈建底層基礎設施，同時由 [**Cloud Build**](https://cloud.google.com/build/) 協調持續整合和持續部署 (CI/CD) 管道。

## 部署工作流程

![部署工作流程](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/deployment_workflow.png)

**說明：**

1. CI 管道 (`deployment/ci/pr_checks.yaml`):

   - 在 Pull Request 建立/更新時觸發
   - 執行單元和整合測試

2. CD 管道 (`deployment/cd/staging.yaml`):

   - 在合併至 `main` 分支時觸發
   - 建構並將應用程式推送至 Artifact Registry
   - 部署至預備環境
   - 執行負載測試

3. 正式環境部署 (`deployment/cd/deploy-to-prod.yaml`):
   - 在預備環境部署成功後觸發
   - 需要手動批准
   - 部署至正式環境

## 設定

> **注意：** 若要使用 Terraform 簡化 CI/CD 管道和基礎設施的單一指令部署，您可以使用 [`uvx agent-starter-pack setup-cicd` CLI 指令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。

**先決條件：**

1. 一組 Google Cloud 專案：
   - 預備專案
   - 正式專案
   - CI/CD 專案 (可與預備或正式專案相同)
2. 您的本機電腦上已安裝 Terraform
3. 在 CI/CD 專案中啟用所需 API。這對於 Terraform 部署是必需的：

   ```bash
   gcloud config set project $YOUR_CI_CD_PROJECT_ID
   gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
   ```

## 逐步指南

1. **使用您偏好的 Git 供應商 (GitHub、GitLab、Bitbucket 等) 建立 Git 儲存庫**

2. **將您的儲存庫連接至 Cloud Build**
   如需詳細說明，請造訪：[Cloud Build 儲存庫設定](https://cloud.google.com/build/docs/repositories#whats_next)。<br>

   ![Alt text](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/connection_cb.gif)

3. **配置 Terraform 變數**

   - 使用您的 Google Cloud 設定編輯 [`deployment/terraform/vars/env.tfvars`](../terraform/vars/env.tfvars)。

   | 變數               | 說明                                                     | 必要     |
   | ---------------------- | --------------------------------------------------------------- | :------: |
   | project_name           | 用作資源命名基礎的專案名稱                 |   Yes    |
   | prod_project_id        | **正式環境** Google Cloud 專案 ID，用於資源部署。 |   Yes    |
   | staging_project_id     | **預備環境** Google Cloud 專案 ID，用於資源部署。    |   Yes    |
   | cicd_runner_project_id | CI/CD 管道將執行的 Google Cloud 專案 ID。     |   Yes    |
   | region                 | 用於資源部署的 Google Cloud 區域。                    |   Yes    |
   | host_connection_name   | 您在 Cloud Build 中建立的主機連線名稱          |   Yes    |
   | repository_name        | 您新增至 Cloud Build 的儲存庫名稱                 |   Yes    |

   其他選用變數可能包括：遙測和意見回饋日誌篩選器、服務帳戶角色，以及對於需要資料攝取 (data ingestion) 的專案：管道 cron 排程、管道角色和資料儲存庫特定配置。

4. **使用 Terraform 部署基礎設施**

   - 開啟終端機並導覽至 Terraform 目錄：

   ```bash
   cd deployment/terraform
   ```

   - 初始化 Terraform：

   ```bash
   terraform init
   ```

   - 應用 Terraform 配置：

   ```bash
   terraform apply --var-file vars/env.tfvars
   ```

   - 在提示時輸入 'yes' 以確認

完成這些步驟後，您的基礎設施將會設定完成並準備好部署！

## 開發部署

用於應用程式的端到端測試，包括追蹤和意見回饋寫入 BigQuery，無需觸發 CI/CD 管道。

首先，啟用所需的 Google Cloud API：

```bash
gcloud config set project <your-dev-project-id>
gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com
```

編輯相關的 [`env.tfvars` 檔案](../terraform/dev/vars/env.tfvars) 後，請依照下列指示操作：

```bash
cd deployment/terraform/dev
terraform init
terraform apply --var-file vars/env.tfvars
```

然後使用下列指令部署應用程式 (從儲存庫的根目錄)：

```bash
make backend
```

### 端對端展示影片

<a href="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/template_deployment_demo.mp4">
  <img src="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/preview_video.png" alt="觀看影片" width="300"/>
</a>
