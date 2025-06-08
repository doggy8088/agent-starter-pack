# 如何貢獻

我們非常樂意接受您對此範例的修補程式和貢獻。您只需要遵循一些小指南。

## 貢獻者許可協議

對此專案的貢獻必須附帶貢獻者許可協議。您（或您的雇主）保留對您的貢獻的版權；這只是允許我們使用和重新分發您的貢獻作為專案的一部分。前往 [Google Developers CLA](https://cla.developers.google.com/) 查看您目前已簽署的協議或簽署新協議。

您通常只需提交一次 CLA，因此如果您已經提交過（即使是為了不同專案），您可能不需要再提交。

## 程式碼審查

所有提交，包括專案成員的提交，都需要審查。我們
為此目的使用 GitHub 拉取請求。請查閱
[GitHub 說明](https://help.github.com/articles/about-pull-requests/) 以獲取更多
關於使用拉取請求的資訊。

## 社群規範

本專案遵循 [Google 的開源社群規範](https://opensource.google/conduct/)。

## 貢獻者指南

如果您是開源貢獻的新手，您可以在此貢獻者指南中找到有用的資訊。

您可以按照以下步驟進行貢獻：

1. **複製官方儲存庫。** 這將在您的帳戶中建立官方儲存庫的副本。
2. **同步分支。** 這將確保您的儲存庫副本與官方儲存庫的最新變更保持同步。
3. **在您複製的儲存庫的功能分支上工作。** 這是您對程式碼進行變更的地方。
4. **在您複製的儲存庫的功能分支上提交您的更新。** 這會將您的變更儲存到您的儲存庫副本中。
5. **向官方儲存庫的 main 分支提交拉取請求。** 這將請求將您的變更合併到官方儲存庫中。
6. **解決任何 Linting 錯誤。** 這將確保您的變更格式正確。
   - 對於由 [check-spelling](https://github.com/check-spelling/check-spelling) 產生的錯誤，請前往 [任務摘要](https://github.com/GoogleCloudPlatform/generative-ai/actions/workflows/spelling.yaml) 閱讀錯誤。
     - 修正所有發現的拼寫錯誤。
     - 禁用模式定義為正規表達式，您可以將它們複製/貼上到許多 IDE 中以找到實例。 [Visual Studio Code 範例](https://medium.com/@nikhilbaxi3/visual-studio-code-secrets-of-regular-expression-search-71723c2ecbd2)。
     - 將誤報添加到 [`.github/actions/spelling/allow.txt`](.github/actions/spelling/allow.txt)。請務必檢查它是否確實拼寫正確！

在此過程中，還有一些額外事項需要記住：

- **閱讀 [Google 的開源社群規範](https://opensource.google/conduct/)。** 貢獻指南將為您提供更多關於專案以及如何貢獻的資訊。
- **測試您的變更。** 在提交拉取請求之前，請確保您的變更按預期運作。
- **保持耐心。** 您的拉取請求可能需要一些時間才能被審查和合併。

---

## 對於 Google 員工

如果您是 Google 員工，作為要求，請遵循 [Google Cloud Platform Generative AI 儲存庫的貢獻指南](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/CONTRIBUTING.md#for-google-employees) 中概述的流程和要求。

## 程式碼品質檢查

為確保程式碼品質，我們利用自動化檢查。在提交拉取請求之前，請在本機執行以下指令：

```bash
make install
```

這將安裝開發相依套件，包括 Linting 工具。

然後，執行以下 Make 指令：

```bash
make lint
```

此指令執行以下 Linting 工具，以檢查程式碼風格、潛在錯誤和類型提示：

- **codespell**: 偵測程式碼和文件中的常見拼寫錯誤。
- **ruff**: 一個快速的 Python Linting 工具和格式化工具，它檢查錯誤、程式設計標準並強制執行風格一致性。
- **mypy**: 執行靜態型別檢查，以在執行時前捕捉型別錯誤。

```bash
make test
```

此命令使用 pytest 執行測試套件，涵蓋單元測試和整合測試：

您的拉取請求也將會被這些工具使用 GitHub Actions 自動檢查。確保您的程式碼在本地通過這些檢查，將有助於加速審查流程。
