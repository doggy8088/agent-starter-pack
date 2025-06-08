# 安裝

有多種方式可以安裝 Agent Starter Pack。請選擇最適合您工作流程的方法。

**想要零設定？** 👉 [在 Firebase Studio 中試用](https://studio.firebase.google.com/new?template=https%3A%2F%2Fgithub.com%2FGoogleCloudPlatform%2Fagent-starter-pack%2Ftree%2Fmain%2Fsrc%2Fresources%2Fidx) 或在 [Cloud Shell 中試用](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https%3A%2F%2Fgithub.com%2Feliasecchig%2Fasp-open-in-cloud-shell&cloudshell_print=open-in-cs)

## `uvx` 適用於快速專案建立

如果您已安裝 [uv](https://astral.sh/uv)，您可以在不安裝的情況下建立專案：
```bash
uvx agent-starter-pack create my-awesome-agent
```

## 虛擬環境安裝

安裝到獨立的 Python 環境中。

```bash
# 建立並啟動 venv
python -m venv .venv && source .venv/bin/activate # source .venv/Scripts/activate for Windows Git Bash

# 使用 pip 或 uv 安裝
pip install agent-starter-pack
```

## 持續性 CLI 安裝

將 `agent-starter-pack` 命令全域安裝。

### 使用 `pipx` (獨立全域工具)
```bash
# 安裝 pipx (如果需要)
python3 -m pip install --user pipx && python3 -m pipx ensurepath

# 安裝 Agent Starter Pack
pipx install agent-starter-pack
```

### 使用 `uv tool install` (快速、獨立全域工具)
需要 `uv` (請參閱 `uvx` 部分了解安裝方式)。
```bash
uv tool install agent-starter-pack
```

## 建立專案 (在持續性/Venv 安裝之後)

如果您透過 `pipx`、`uv tool install` 或在虛擬環境中安裝：
```bash
agent-starter-pack create my-awesome-agent
```

## 管理安裝

### 升級
*   **`uvx`:** 不需要 (總是使用最新版本)。
*   **`pipx`:** `pipx upgrade agent-starter-pack`
*   **`uv tool`:** `uv tool install agent-starter-pack` (這會升級)
*   **`pip`/`uv pip` (在 .venv 中):** `(uv) pip install --upgrade agent-starter-pack`

### 解除安裝
*   **`uvx`:** 不適用。
*   **`pipx`:** `pipx uninstall agent-starter-pack`
*   **`uv tool`:** `uv tool uninstall agent-starter-pack`
*   **`pip`/`uv pip` (在 .venv 中):** `(uv) pip uninstall agent-starter-pack`

## 常見安裝問題疑難排解

### 安裝後找不到命令

如果您在安裝後遇到「找不到命令」錯誤：

1.  **檢查您的 PATH**：確保 Python 腳本目錄在您的 PATH 中：
    ```bash
    echo $PATH
    ```
2.  **驗證安裝位置**：檢查套件的安裝位置：
    ```bash
    pip show agent-starter-pack
    ```
3.  **手動新增路徑**：如果需要，將腳本目錄新增到您的 PATH：
    ```bash
    export PATH="$HOME/.local/bin:$PATH"
    # 適用於使用者安裝
    ```
    將此行新增到您的 `~/.bashrc` 或 `~/.zshrc` 中以保持持久性。

### 安裝期間的權限錯誤

如果您遇到權限錯誤：

1.  **使用使用者安裝模式**：
    ```bash
    pip install --user agent-starter-pack
    ```
2.  **檢查目錄權限**：
    ```bash
    ls -la ~/.local/bin
    ```
3.  **如果需要，修復權限**：
    ```bash
    chmod +x ~/.local/bin/agent-starter-pack
    ```

### Python 版本相容性問題

如果您遇到 Python 版本錯誤：

1.  **檢查您的 Python 版本**：
    ```bash
    python --version
    ```
2.  **如果需要，安裝相容的 Python 版本** (需要 3.10 或更高版本)。
3.  **使用正確的 Python 版本建立虛擬環境**：
    ```bash
    python3.10 -m venv .venv
    source .venv/bin/activate
    ```

### 套件相依性衝突

如果您遇到相依性衝突：

1.  **使用乾淨的虛擬環境**：
    ```bash
    python -m venv .venv
    source .venv/bin/activate
    pip install agent-starter-pack
    ```
2.  **更新 pip 和 setuptools**：
    ```bash
    pip install --upgrade pip setuptools
    ```
3.  **以詳細輸出模式安裝以識別衝突**：
    ```bash
    pip install -v agent-starter-pack
    ```

### 安裝驗證

要驗證您的安裝是否正常運作：

1.  **檢查已安裝版本**：
    ```bash
    agent-starter-pack --version
    ```
2.  **執行說明命令**：
    ```bash
    agent-starter-pack --help
    ```

如果您持續遇到問題，請[提出問題](https://github.com/GoogleCloudPlatform/agent-starter-pack/issues)並提供有關您環境的詳細資訊以及您遇到的特定錯誤訊息。
