# 如何貢獻

我們非常樂意接受您對此範例的補丁和貢獻。您只需遵循一些簡單的指南。

## 貢獻者授權協議
對此專案的貢獻必須附有貢獻者授權協議。您（或您的雇主）保留您貢獻的著作權；這僅授予我們權限使用並重新分發您的貢獻作為專案的一部分。前往 [Google Developers CLA](https://cla.developers.google.com/) 查看您目前的協議或簽署新協議。
您通常只需提交一次 CLA，因此如果您已經提交過（即使是針對不同的專案），您可能不需要再提交一次。

## 程式碼審查

所有提交，包括專案成員的提交，都需要審查。我們為此目的使用 GitHub pull requests。請查閱 [GitHub 說明](https://help.github.com/articles/about-pull-requests/) 以獲取更多關於使用 pull requests 的資訊。

## 社群準則
此專案遵循 [Google 的開源社群準則](https://opensource.google/conduct/)。

## 貢獻者指南

如果您是開源貢獻的新手，您可以在此貢獻者指南中找到有用的資訊。

您可以按照以下步驟進行貢獻：

1. **複製（Fork）官方儲存庫。** 這將在您自己的帳戶中建立一個官方儲存庫的副本。
2. **同步分支。** 這將確保您的儲存庫副本與官方儲存庫的最新變更保持同步。
3. **在您複製的儲存庫的特性分支上工作。** 您將在此處對程式碼進行變更。
4. **在您複製的儲存庫的特性分支上提交您的更新。** 這將把您的變更儲存到您的儲存庫副本中。
5. **向官方儲存庫的主分支提交一個 pull request。** 這將請求將您的變更合併到官方儲存庫中。
6. **解決任何 linting 錯誤。** 這將確保您的變更格式正確。
   - 對於 [check-spelling](https://github.com/check-spelling/check-spelling) 產生的錯誤，請前往 [任務摘要](https://github.com/GoogleCloudPlatform/generative-ai/actions/workflows/spelling.yaml) 閱讀錯誤。
   - 修正所有找到的拼寫錯誤。
     - 禁用模式（Forbidden Patterns）被定義為正規表達式，您可以將它們複製/貼上到許多 IDE 中以查找實例。 [Visual Studio Code 的範例](https://medium.com/@nikhilbaxi3/visual-studio-code-secrets-of-regular-expression-search-71723c2ecbd2)。
     - 將誤報（false positives）添加到 [`.github/actions/spelling/allow.txt`](.github/actions/spelling/allow.txt)。務必檢查它是否確實拼寫正確！
在此過程中，還有一些額外事項需要記住：

- **閱讀 [Google 的開源社群準則](https://opensource.google/conduct/)。** 貢獻指南將為您提供更多關於專案以及如何貢獻的資訊。
- **測試您的變更。** 在提交 pull request 之前，請確保您的變更按預期工作。
- **保持耐心。** 您的 pull request 可能需要一些時間才能被審查和合併。

---

## 適用於 Google 員工
如果您是 Google 員工，作為一項要求，請遵循 [Google Cloud Platform Generative AI 儲存庫的貢獻指南](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/CONTRIBUTING.md#for-google-employees) 中概述的步驟和要求。

## 程式碼品質檢查

為確保程式碼品質，我們採用自動化檢查。在提交 pull request 之前，請在本地執行以下命令：

```bash
make install
```
這將安裝開發相依性，包括 linting 工具。

然後，執行以下 Make 命令：

```bash
make lint
```

此命令執行以下 lint 工具以檢查程式碼風格、潛在錯誤和型別提示：

- **codespell**: 檢測程式碼和文件中常見的拼寫錯誤。
- **ruff**: 一個快速的 Python lint 工具和格式化工具，它檢查錯誤、程式設計標準並強制執行風格一致性。
- **mypy**：執行靜態型別檢查，以在執行時期之前捕捉型別錯誤。

```bash
make test
```

此指令使用 pytest 執行測試套件，涵蓋單元測試和整合測試：

您的 pull request 也將使用 GitHub Actions 由這些工具自動檢查。確保您的程式碼在本地通過這些檢查，將有助於加快審查流程。