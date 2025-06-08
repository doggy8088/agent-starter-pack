# `setup-cicd`

`setup-cicd` 指令是 `agent-starter-pack` 提供的一個強大工具，它能自動化部署完整的 Terraform 基礎設施，並在單一操作中設定您的 Google Cloud 專案。

**⚡️ 快速入門範例：**

開始使用非常簡單。我們建議使用 `uvx` 來執行此指令，因為 `uv`（一個前置條件，請參閱下方）即使 `agent-starter-pack` 未全域安裝，也會為您處理擷取和執行它：

```bash
uvx agent-starter-pack setup-cicd
```
*(系統將提示您輸入預備和生產環境的專案 ID)*

或者，您可以直接以旗標形式提供專案 ID：

```bash
uvx agent-starter-pack setup-cicd \
  --staging-project=your-staging-project-id \
  --prod-project=your-prod-project-id
```
**💡 提示：** 使用 `uvx` (例如 `uvx agent-starter-pack ...`) 可確保您無需全域安裝 `agent-starter-pack` 套件或將其安裝在當前環境中即可執行指令。`uv` 本身必須已安裝。

**⚠️ 重要注意事項：**

*   **實驗性質：** 此指令仍在積極開發中。請謹慎使用並回報任何問題。
*   **生產環境使用：** 對於生產環境，我們**強烈建議**遵循 `deployment/README.md` 中的詳細說明。手動設定可提供對安全性和組態的更高控制。此自動化指令最適合用於開發和測試。
*   **僅限 GitHub：** 目前，僅支援 GitHub 作為 Git 供應商。

## 前置條件
1.  **從專案根目錄執行：** 從 `agent-starter-pack` 專案的根目錄（`pyproject.toml` 所在位置）執行此指令。
2.  **安裝工具：**
    *   `uv`：此指令將使用 `uvx` 執行。請確保已安裝 `uv`。（請參閱 [uv 安裝指南](https://github.com/astral-sh/uv#installation)）
    *   Terraform
    *   `gh` CLI (GitHub CLI)：使用 `gh auth login` 安裝並驗證。
*   `gcloud` CLI (Google Cloud SDK)：使用 `gcloud auth application-default login` 驗證。
3.  **Google Cloud 專案：** 您需要至少兩個 Google Cloud 專案：一個用於預備環境，一個用於生產環境。如果您未提供 `--staging-project` 和 `--prod-project` 旗標，此指令將提示您輸入其 ID。您還需要一個專案來託管 CI/CD 資源 (Cloud Build、Artifact Registry、Terraform 狀態)。您可以使用 `--cicd-project` 指定此專案。如果省略，則生產專案將用於 CI/CD 資源。
4.  **權限：** 執行此指令的使用者或服務帳戶必須在指定的 Google Cloud 專案（預備、生產、若指定 CI/CD、若指定開發環境）上擁有 `擁有者` 角色。這對於建立資源和指派 IAM 角色是必要的。

## 運作方式

`setup-cicd` 指令自動化處理以下事項：

1.  **GitHub 整合：** 建立一個新的私人 GitHub 儲存庫或連接到現有儲存庫（如果需要，將提示詳細資訊）。
2.  **專案 ID 確認：** 如果未透過旗標提供，則提示輸入預備和生產專案 ID。
3.  **Cloud Build 連線：** 設定 Cloud Build 與您的 GitHub 儲存庫的連線。
4.  **Terraform 設定：**
    *   設定 Terraform 以管理您的 CI/CD 基礎設施（Cloud Build 觸發器、IAM 權限等），並可選地管理開發環境（如果提供了 `--dev-project`）。
*   依預設，使用您的 CI/CD 專案中的 Google Cloud Storage (GCS) 儲存桶 (`<CICD_PROJECT_ID>-terraform-state`) 設定遠端 Terraform 狀態管理。使用 `--local-state` 可選擇退出。
5.  **資源部署：** 執行 `terraform apply` 以在 Google Cloud 中建立必要的資源並設定 GitHub 儲存庫連線。
6.  **本地 Git 設定：** 在本地初始化 Git 儲存庫（如果需要），並將 GitHub 儲存庫添加為 `origin` 遠端。

## 執行指令
```bash
uvx agent-starter-pack setup-cicd \
    [--staging-project <YOUR_STAGING_PROJECT_ID>] \
    [--prod-project <YOUR_PROD_PROJECT_ID>] \
    [--cicd-project <YOUR_CICD_PROJECT_ID>] \
    [--dev-project <YOUR_DEV_PROJECT_ID>] \
    [--region <GCP_REGION>] \
    [--repository-name <GITHUB_REPO_NAME>] \
    [--repository-owner <GITHUB_USERNAME_OR_ORG>] \
    [--local-state] \
    [--auto-approve] \
    [--debug]
```

**主要選項：**
*   `--staging-project`、`--prod-project`：**必填資訊。**您的 Google Cloud 專案 ID，用於預備和生產環境。如果省略這些旗標，指令將提示您輸入。
*   `--cicd-project`：(選填) 用於託管 CI/CD 資源（Cloud Build、Artifact Registry、Terraform 狀態儲存桶）的專案 ID。如果省略，則預設為生產環境的專案 ID（透過旗標或提示提供）。
*   `--dev-project`：(選填) 用於由 Terraform 管理的專用開發環境的專案 ID。如果提供，Terraform 也將套用以在此開發專案中設定資源。
*   `--region`：(選填) GCP 資源區域（預設值：`us-central1`）。
*   `--repository-name`：(選填) GitHub 儲存庫的名稱。如果省略，您將會收到提示或產生一個名稱。
*   `--repository-owner`：(選填) 您的 GitHub 使用者名稱或組織。如果省略，則預設為已驗證的 `gh` 使用者。
*   `--local-state`：(選填) 使用本機檔案作為 Terraform 狀態，而不是預設的 GCS 後端。不建議用於協作。
*   `--auto-approve`：(選填) 跳過互動式提示（包括如果省略旗標時的專案 ID 提示）。請謹慎使用。
*   `--debug`：(選填) 啟用詳細記錄。

*(對於具有預先存在連線的進階/程式設計用途，請參閱選項，例如 `--github-pat`、`--github-app-installation-id`、`--host-connection-name`，透過執行 `uvx agent-starter-pack setup-cicd --help`)*

## 執行指令後

1.  **提交並推送：**這對於觸發管線至關重要。
    ```bash
    git add .
    git commit -m "agent starter pack 的初始提交"
    git push -u origin main
    ```
2.  **驗證：**檢查您的 GitHub 儲存庫和 Google Cloud 專案（Cloud Build > 觸發器、Secret Manager、IAM），以查看已建立的資源。

## 手動 CI/CD 設定（推薦用於生產環境）

對於具有對安全性、客製化和進階 CI/CD 實踐進行精細控制的強大、生產就緒的部署，請遵循[手動設定指南](../guide/deployment.md)。