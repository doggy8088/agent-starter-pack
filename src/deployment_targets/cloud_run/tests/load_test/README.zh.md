# 生成式AI應用程式的穩健負載測試

此目錄提供一個針對您的生成式AI應用程式的全面負載測試框架，該框架利用領先的開源負載測試工具 [Locust](http://locust.io) 的強大功能。

## 本地負載測試

請按照以下步驟在您的本地機器上執行負載測試：

**1. 啟動 FastAPI 伺服器：**

在另一個終端機中啟動 FastAPI 伺服器：

```bash
uv run uvicorn app.server:app --host 0.0.0.0 --port 8000 --reload
```

**2. (在另一個分頁中) 建立帶有 Locust 的虛擬環境**
建議使用另一個終端機分頁，以避免與現有的應用程式 Python 環境衝突。

```bash
python3 -m venv .locust_env && source locust_env/bin/activate && pip install locust==2.31.1
```

**3. 執行負載測試：**
使用以下指令觸發 Locust 負載測試：

```bash
locust -f tests/load_test/load_test.py \
-H http://127.0.0.1:8000 \
--headless \
-t 30s -u 10 -r 2 \
--csv=tests/load_test/.results/results \
--html=tests/load_test/.results/report.html
```

此指令啟動一個 30 秒的負載測試，模擬每秒產生 2 個使用者，最多達到 60 個並行使用者。

**結果：**

詳細說明負載測試效能的全面 CSV 和 HTML 報告將在 `tests/load_test/.results` 目錄中產生並儲存。

## 遠端負載測試 (目標為 Cloud Run)

此框架也支援針對遠端目標（例如預備環境的 Cloud Run 實例）進行負載測試。此過程透過 Cloud Build 無縫整合到持續交付 (Continuous Delivery) 管線中，如 [pipeline file](cicd/cd/staging.yaml) 所定義。

**先決條件：**

- **相依性：** 確保您的環境具有本地測試所需的相同相依性。
- **Cloud Run Invoker 角色：** 您需要 `roles/run.invoker` 角色才能呼叫 Cloud Run 服務。

**步驟：**

**1. 取得 Cloud Run 服務 URL：**

導航至 Cloud Run 控制台，選擇您的服務，並複製頂部顯示的 URL。將此 URL 設定為環境變數：

```bash
export RUN_SERVICE_URL=https://your-cloud-run-service-url.run.app
```

**2. 取得 ID Token：**

擷取認證所需的 ID Token：

```bash
export _ID_TOKEN=$(gcloud auth print-identity-token -q)
```

**3. 執行負載測試：**
建立帶有 Locust 的虛擬環境：
```bash
python3 -m venv .locust_env && source locust_env/bin/activate && pip install locust==2.31.1
```

執行負載測試。以下指令執行與本地測試相同的負載測試參數，但目標為您的遠端 Cloud Run 實例。
```bash
locust -f tests/load_test/load_test.py \
-H $RUN_SERVICE_URL \
--headless \
-t 30s -u 60 -r 2 \
--csv=tests/load_test/.results/results \
--html=tests/load_test/.results/report.html
```
