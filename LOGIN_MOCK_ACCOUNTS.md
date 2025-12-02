# Login Mock Accounts

模擬帳號僅用於展示 CorgiRisk 多身份登入流程，請勿使用於正式環境。若需新增或調整資料，請同步更新 `src/views/Login.vue` 內的 `mockAccounts` 常數並通知所有示範人員。

## Available Identities

| 角色 | 帳號 (Username) | 密碼 (Password) | 導向頁面 | 目的 |
| --- | --- | --- | --- | --- |
| 企業決策者 | `corgiBiz` | `GrowCorgi1!` | `/business` | 查看科技信用資產與利率建議 |
| 銀行行員 | `bankLee` | `ReviewCorgi2@` | `/staff` | 進行智慧訪查並生成報告 |
| 授信審核 | `creditChen` | `ScoreCorgi3#` | `/credit-review` | 參考動態風險量化與決策建議 |

## Usage Notes

- 於登入表單輸入對應帳號與密碼後，系統會識別角色並導向表中指定路徑。
- 若導頁路徑調整（例如更新 router 結構），請同步修正文檔與 `mockAccounts` 設定。
- 測試報告請註明使用的身份／帳號，以便追蹤示範情境。
