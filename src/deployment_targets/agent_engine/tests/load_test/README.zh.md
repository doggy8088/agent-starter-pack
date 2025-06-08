# 生成式AI應用程式的穩固負載測試

此目錄為您的生成式AI應用程式提供了一個全面的負載測試框架，利用領先的開源負載測試工具 [Locust](http://locust.io) 的強大功能。

## 負載測試

在執行負載測試之前，請確保您已遠端部署後端。

請遵循以下步驟執行負載測試：

**1. 遠端部署後端：**
   ```bash
   gcloud config set project <your-dev-project-id>
   make backend
   ```

**2. 為Locust建立虛擬環境：**
   建議使用單獨的終端機分頁並為 Locust 建立一個虛擬環境，以避免與您的應用程式 Python 環境發生衝突。

   ```bash
   # 建立並啟用虛擬環境
   python3 -m venv .locust_env
   source .locust_env/bin/activate
   
   # 安裝所需的套件
   pip install locust==2.31.1 "google-cloud-aiplatform[langchain,reasoningengine]>=1.77.0"
   ```

**3. 執行負載測試：**
   使用以下指令觸發 Locust 負載測試：

   ```bash
   export _AUTH_TOKEN=$(gcloud auth print-access-token -q)
   locust -f tests/load_test/load_test.py \
   --headless \
   -t 30s -u 5 -r 2 \
   --csv=tests/load_test/.results/results \
   --html=tests/load_test/.results/report.html
   ```

   此指令啟動一個為期 30 秒的負載測試，模擬每秒生成 2 個使用者，最多達到 10 個平行使用者。

