# 部署

::: tip ⭐ 精簡部署
若要使用 Terraform 精簡地以一個指令部署整個 CI/CD 管線與基礎設施，您可以使用 [`uvx agent-starter-pack setup-cicd` CLI 指令](../cli/setup_cicd)。目前僅支援 Github。
:::
此範本代理程式利用 [**Terraform**](http://terraform.io) 定義並佈建底層基礎設施，同時由 [**Cloud Build**](https://cloud.google.com/build/) 協調持續整合與持續部署 (CI/CD) 管線。

## 部署工作流程

![部署工作流程](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/deployment_workflow.png)

**說明：**

1. CI 管線 (`deployment/ci/pr_checks.yaml`):
   - 於 pull request 建立/更新時觸發
   - 執行單元與整合測試

2. CD 管線 (`deployment/cd/staging.yaml`):

   - 於合併至 `main` 分支時觸發
   - 建構並將應用程式推送至 Artifact Registry
   - 部署至預備環境
   - 執行負載測試

3. 生產環境部署 (`deployment/cd/deploy-to-prod.yaml`):
   - 於預備環境部署成功後觸發
   - 需要手動批准
   - 部署至生產環境

## 設定

**先決條件：**

1. 一組 Google Cloud 專案：
   - 預備專案
   - 生產專案
   - CI/CD 專案 (可與預備或生產專案相同)
2. 在本機安裝 Terraform
3. 在 CI/CD 專案中啟用所需 API。這將是 Terraform 部署的必要條件：

   ```bash
   gcloud config set project $YOUR_CI_CD_PROJECT_ID
   gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
   ```

## 逐步指南

1. **使用您偏好的 Git 提供者（GitHub、GitLab、Bitbucket 等）建立 Git 儲存庫**

2. **將您的儲存庫連接至 Cloud Build**
   如需詳細說明，請造訪：[Cloud Build 儲存庫設定](https://cloud.google.com/build/docs/repositories#whats_next)。<br>

   ![替代文字](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/connection_cb.gif)

3. **設定 Terraform 變數**

   - 使用您的 Google Cloud 設定編輯 `deployment/terraform/vars/env.tfvars`。

   | 變數               | 說明                                                     | 必要 |
   | ---------------------- | --------------------------------------------------------------- | :------: |
   | project_name           | 用作資源命名基礎的專案名稱                 |   是    |
   | prod_project_id        | 用於資源部署的 **生產** Google Cloud 專案 ID。 |   是    |
   | staging_project_id     | 用於資源部署的 **預備** Google Cloud 專案 ID。    |   是    |
   | cicd_runner_project_id | CI/CD 管線將執行所在的 Google Cloud 專案 ID。     |   是    |
   | region                 | 用於資源部署的 Google Cloud 區域。                    |   是    |
   | host_connection_name   | 您在 Cloud Build 中建立的主機連接名稱          |   是    |
   | repository_name        | 您新增至 Cloud Build 的儲存庫名稱                 |   是    |

   其他選用變數可能包括：遙測與意見回饋日誌篩選器、服務帳戶角色，以及對於需要資料攝取的專案：管線 cron 排程、管線角色和資料儲存庫特定組態。

4. **使用 Terraform 部署基礎設施**

   - 開啟終端機並導覽至 Terraform 目錄：

   ```bash
   cd deployment/terraform
   ```

   - 初始化 Terraform：

   ```bash
   terraform init
   ```

   - 應用 Terraform 組態：

   ```bash
   terraform apply --var-file vars/env.tfvars
   ```

   - 在提示時輸入 'yes' 以確認

完成這些步驟後，您的基礎設施將會設定完成並準備好部署！

## 開發環境部署

用於應用程式的端對端測試，包括追蹤和意見回饋沉入 BigQuery，而無需觸發 CI/CD 管線。


首先，啟用所需的 Google Cloud API：

```bash
gcloud config set project <your-dev-project-id>
gcloud services enable serviceusage.googleapis.com cloudresourcemanager.googleapis.com
```

在您編輯相關的 `terraform/dev/vars/env.tfvars` 檔案後，請依照以下說明操作：

```bash
cd deployment/terraform/dev
terraform init
terraform apply --var-file vars/env.tfvars
```

然後使用以下指令（從儲存庫的根目錄）部署應用程式：

```bash
make backend
```

> 注意：Makefile 也提供一個指令來自動化 dev terraform apply 設定。`make setup-dev-env`

### 端對端展示影片

<a href="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/template_deployment_demo.mp4">
  <img src="https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/preview_video.png" alt="觀看影片" width="300"/>
</a>
