# このアプリについて

## なぜCSRなのか？
```
TDDで開発する以上、テスト容易性を高めるには複雑性なSSRをreact-testing-library(以下rtl)でテストするのは難しい。
テストできなくはないが、rtlの設計思想的にCSRでのDOMレンダリングを想定しているため、SSRのテストは実際の動作と乖離がある。
また、AppRouterはServerActionsなどSSRが主体となるため採用を見送っている。
```