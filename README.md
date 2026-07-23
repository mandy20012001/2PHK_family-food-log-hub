# Family Food Log Hub - Phase 1

## 文件結構

```
family-food-log-hub/
├── index.html          ← 主應用（單頁應用，所有頁面在此）
├── manifest.json       ← PWA 配置
├── sw.js               ← Service Worker（離線可用）
└── README.md           ← 部署教學
```

## 部署教學

### 方法 1：GitHub Pages（推薦）

1. 開新 GitHub Repository
2. 上傳 `index.html`, `manifest.json`, `sw.js`
3. Settings → Pages → Source: Deploy from a branch → main / root
4. 等待 1-2 分鐘，訪問 `https://yourname.github.io/repo-name`

### 方法 2：Netlify

1. 拖放三個文件到 [Netlify Drop](https://app.netlify.com/drop)
2. 自動獲得網址

### 方法 3：本地測試

```bash
# 需要 Python
python -m http.server 8000
# 訪問 http://localhost:8000
```

## PWA 安裝（Android）

1. Chrome 打開網站
2. 底部彈出「Add to Home Screen」→ 點擊
3. 或點擊右上角 ⋮ → "Add to Home Screen"
4. 手機桌面出現 🍳 FoodLog 圖標

## 測試帳號

| 用戶 | 密碼 | 權限 |
|------|------|------|
| Marie | `51209289` | 日常記帳、購物、煮餸 |
| Madam or Sir | `20180203` | 全部功能 + Dashboard |

## Phase 1 功能清單

- [x] PWA 結構（manifest + service worker）
- [x] Tailwind CDN 引入
- [x] 登入頁面（雙用戶 + Remember Me）
- [x] 首頁（餘額卡片 + Quick Actions 2x4 網格）
- [x] 底部導航列（6 個 Tab）
- [x] Shopping / Cooking / Report / History / Settings 頁面骨架
- [x] 僱主 Dashboard 頁面
- [x] Meal Planner 頁面骨架
- [x] 現金支出彈窗（Category 選擇 + 智能建議）
- [x] 交通費彈窗（歷史選擇 + 手動輸入）
- [x] 增值彈窗
- [x] 存入彈窗
- [x] 交易歷史（搜尋 + 分組顯示）
- [x] 數據持久化（LocalStorage）
- [x] Toast 通知系統
- [x] 離線可用
