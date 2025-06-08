# 監控與可觀察性

![monitoring_flow](https://storage.googleapis.com/github-repo/generative-ai/sample-apps/e2e-gen-ai-app-starter-pack/monitoring_flow.png)

### 追蹤與日誌擷取

模板化代理程式利用 [OpenTelemetry](https://opentelemetry.io/) 實現全面的可觀察性，將事件發送到 Google Cloud Trace 和 Google Cloud Logging。每次與 LLM 的互動都已檢測，實現對以此框架建構的代理程式中請求流程的詳細追蹤。
利用 [CloudTraceSpanExporter](https://cloud.google.com/python/docs/reference/spanner/latest/opentelemetry-tracing)，此框架擷取並匯出追蹤資料。為了解決 Cloud Trace ([256 位元組屬性值限制](https://cloud.google.com/trace/docs/quotas#limits_on_spans)) 和 [Cloud Logging](https://cloud.google.com/logging/quotas) ([256KB 日誌項目大小](https://cloud.google.com/logging/quotas)) 的限制，模板化專案的 `app/utils/tracing.py` 中實作了 CloudTraceSpanExporter 的客製化擴充。
此擴充透過以下方式增強可觀察性：

- 為每個已擷取事件建立對應的 Google Cloud Logging 項目。
- 當負載超過 256KB 時，自動將事件資料儲存到 Google Cloud Storage。

已記錄的負載與原始追蹤關聯，確保從 Cloud Trace 主控台無縫存取。

### 日誌路由器
事件透過 [日誌路由器](https://cloud.google.com/logging/docs/routing/overview) 轉發到 BigQuery，用於長期儲存與分析。日誌路由器的部署是透過模板化專案中 `deployment/terraform` 的 Terraform 程式碼處理的。

### Looker Studio 儀表板
資料寫入 BigQuery 後，即可用於填充 [Looker Studio 儀表板](https://lookerstudio.google.com/c/reporting/46b35167-b38b-4e44-bd37-701ef4307418/page/tEnnC)。如果使用非 ADK 代理程式，請使用 [此儀表板](https://lookerstudio.google.com/c/reporting/fa742264-4b4b-4c56-81e6-a667dd0f853f/page/tEnnC)。

此儀表板模板提供一個起點，用於在擷取的資料之上建構客製化視覺化。

## 免責聲明
**注意：** 模板化代理程式旨在實現 *您的* Google Cloud 專案中的使用案例可觀察性。Google Cloud 不會記錄、監控或以其他方式存取從已部署資源生成的任何資料。請參閱 [Google Cloud 服務條款](https://cloud.google.com/terms/service-terms) 以了解更多詳情。