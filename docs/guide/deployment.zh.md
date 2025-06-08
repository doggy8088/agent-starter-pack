# 部署

::: tip ⭐ 簡化部署
若要利用 Terraform 簡化地透過單一指令部署整個 CI/CD 管線與基礎設施，您可以使用 [`uvx agent-starter-pack setup-cicd` CLI 指令](../cli/setup_cicd)。目前僅支援 GitHub。
:::
範本化的代理程式利用 [**Terraform**](http://terraform.io) 定義與佈建基礎設施，而 [**Cloud Build**](https://cloud.google.com/build/) 則協調持續整合與持續部署 (CI/CD) 管線。

## 部署工作流程

![部署工作流程](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/deployment_workflow.png)

**說明：**

1. CI 管線 (`deployment/ci/pr_checks.yaml`):
   - 在建立/更新拉取請求時觸發
   - 執行單元與整合測試

2. CD 管線 (`deployment/cd/staging.yaml`):

   - 在合併至 `main` 分支時觸發
   - 建構應用程式並推送到 Artifact Registry
   - 部署至預備環境
   - 執行負載測試

3. 生產部署 (`deployment/cd/deploy-to-prod.yaml`):
   - 在成功部署至預備環境後觸發
   - 需要手動批准
   - 部署至生產環境

## 設定
**先決條件：**

1. 一組 Google Cloud 專案：
   - 預備專案
   - 生產專案
   - CI/CD 專案 (可與預備或生產專案相同)
2. 本機已安裝 Terraform
3. 在 CI/CD 專案中啟用必要的 API。這對於 Terraform 部署是必需的：

   ```bash
   gcloud config set project $YOUR_CI_CD_PROJECT_ID
   gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
   ```

## 逐步指南

1. **建立 Git 儲存庫（使用您偏好的 Git 供應商，如 GitHub、GitLab、Bitbucket 等）**

2. **連接您的儲存庫至 Cloud Build**
   如需詳細說明，請造訪：[Cloud Build 儲存庫設定](https://cloud.google.com/build/docs/repositories#whats_next)。<br>
   ![Alt text](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/connection_cb.gif)

3. **配置 Terraform 變數**

   - 使用您的 Google Cloud 設定編輯 `deployment/terraform/vars/env.tfvars`。

   | 變數               | 說明                                                     | 必填 |
   | ---------------------- | --------------------------------------------------------------- | :------: |
   | 專案名稱           | 作為資源命名基礎的專案名稱                 |   是    |
   | 生產專案 ID        | **生產** Google Cloud 專案 ID，用於資源部署。 |   是    |
   | 預備專案 ID     | **預備** Google Cloud 專案 ID，用於資源部署。    |   是    |
   | CI/CD 執行器專案 ID | 將執行 CI/CD 管線的 Google Cloud 專案 ID。     |   是    |
   | 區域                 | 用於資源部署的 Google Cloud 區域。                    |   是    |
   | 主機連線名稱   | 您在 Cloud Build 中建立的主機連線名稱          |   是    |
   | 儲存庫名稱        | 您新增到 Cloud Build 的儲存庫名稱                 |   是    |
   其他可選變數可能包括：遙測與回饋日誌篩選器、服務帳戶角色，以及對於需要資料攝取的專案：管線 Cron 排程、管線角色和資料儲存庫特定配置。

4. **使用 Terraform 部署基礎設施**

   - 開啟終端機並導航至 Terraform 目錄：

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

   - 在提示確認時輸入 'yes'

完成這些步驟後，您的基礎設施將會設定完成並準備好進行部署！

## 開發部署

用於應用程式的端到端測試，包括追蹤和回饋資料匯入 BigQuery，無需觸發 CI/CD 管線。


首先，啟用必要的 Google Cloud API：

```bash
gcloud config set project <your-dev-project-id>"
gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com
```

編輯相對應的 `terraform/dev/vars/env.tfvars` 檔案後，請依照以下說明操作：

```bash
cd deployment/terraform/dev
terraform init
terraform apply --var-file vars/env.tfvars
```

然後使用以下指令（從儲存庫的根目錄）部署應用程式：

```bash
make backend
```
> 注意：Makefile 也提供了一個指令來自動化開發環境的 Terraform 應用程式設定。`make setup-dev-env`

### 端到端展示影片

<a href="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/template_deployment_demo.mp4">
  <img src="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/preview_video.png" alt="觀看影片" width="300"/>
</a>