# 部署 README.md

此資料夾包含用於在 Google Cloud 上部署對話式生成式 AI 應用程式的基礎設施即程式碼和 CI/CD 管道配置。

該應用程式利用 [**Terraform**](http://terraform.io) 定義和佈建底層基礎設施，而 [**Cloud Build**](https://cloud.google.com/build/) 協調持續整合和持續部署 (CI/CD) 管道。

## 部署工作流程
![部署工作流程](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/deployment_workflow.png)

**說明：**

1. CI 管道 (`deployment/ci/pr_checks.yaml`):

   - 在拉取請求建立/更新時觸發
   - 執行單元和整合測試

2. CD 管道 (`deployment/cd/staging.yaml`):

   - 在合併至 `main` 分支時觸發
   - 建構應用程式並推送到 Artifact Registry
   - 部署到預備環境
   - 執行負載測試

3. 生產環境部署 (`deployment/cd/deploy-to-prod.yaml`):
   - 在預備環境部署成功後觸發
   - 需要手動批准
   - 部署到生產環境

## 設定
> **注意：** 如需使用 Terraform 簡化整個 CI/CD 管道和基礎設施的一鍵部署，您可以使用 [`uvx agent-starter-pack setup-cicd` CLI 指令](https://googlecloudplatform.github.io/agent-starter-pack/cli/setup_cicd.html)。目前僅支援 Github。

**先決條件：**

1. 一組 Google Cloud 專案：
   - 預備專案
   - 生產專案
   - CI/CD 專案 (可與預備或生產專案相同)
2. 您的本機電腦上已安裝 Terraform
3. 在 CI/CD 專案中啟用所需的 API。這將是 Terraform 部署所必需的：

   ```bash
   gcloud config set project $YOUR_CI_CD_PROJECT_ID
   gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
   ```

## 逐步指南

1. **使用您偏好的 Git 供應商 (GitHub, GitLab, Bitbucket 等) 建立 Git 儲存庫**
2. **將您的儲存庫連接到 Cloud Build**
   有關詳細說明，請造訪：[Cloud Build 儲存庫設定](https://cloud.google.com/build/docs/repositories#whats_next)。<br>

   ![替代文字](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/connection_cb.gif)

3. **設定 Terraform 變數**

   - 使用您的 Google Cloud 設定編輯 [`deployment/terraform/vars/env.tfvars`](../terraform/vars/env.tfvars)。
| 變數               | 說明                                                     | 必填 |
   | ---------------------- | --------------------------------------------------------------- | :------: |
   | project_name           | 用作資源命名基礎的專案名稱                 |   是    |
   | prod_project_id        | 用於資源部署的 **生產** Google Cloud 專案 ID。 |   是    |
| staging_project_id     | 用於資源部署的 **預備** Google Cloud 專案 ID。    |   是    |
   | cicd_runner_project_id | CI/CD 管道將執行的 Google Cloud 專案 ID。     |   是    |
   | region                 | 用於資源部署的 Google Cloud 區域。                    |   是    |
   | host_connection_name   | 您在 Cloud Build 中建立的主機連接名稱          |   是    |
| repository_name        | 您新增到 Cloud Build 的儲存庫名稱                 |   是    |

   其他可選變數可能包括：遙測和回饋日誌過濾器、服務帳戶角色，以及對於需要資料攝取的專案：管道 cron 排程、管道角色和資料儲存區特定配置。

4. **使用 Terraform 部署基礎設施**

   - 開啟終端機並導航到 Terraform 目錄：

   ```bash
   cd deployment/terraform
   ```
- 初始化 Terraform：

   ```bash
   terraform init
   ```

   - 套用 Terraform 配置：

   ```bash
   terraform apply --var-file vars/env.tfvars
   ```

   - 在提示確認時輸入 'yes'

完成這些步驟後，您的基礎設施將會設定完成並準備好部署！

## 開發環境部署

用於應用程式的端到端測試，包括追蹤和回饋寫入 BigQuery，無需觸發 CI/CD 管道。
首先，啟用所需的Google Cloud API：

```bash
gcloud config set project <your-dev-project-id>
gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com
```

編輯相對應的[`env.tfvars` 文件](../terraform/dev/vars/env.tfvars)後，請依照以下指示操作：

```bash
cd deployment/terraform/dev
terraform init
terraform apply --var-file vars/env.tfvars
```
然後使用以下指令部署應用程式（從儲存庫的根目錄）：

```bash
make backend
```

### 端到端展示影片

<a href="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/template_deployment_demo.mp4">
  <img src="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/preview_video.png" alt="觀看影片" width="300"/>
</a>