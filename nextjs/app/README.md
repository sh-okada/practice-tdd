# このアプリについて

## なぜCSRなのか？
TDDで開発する以上、SSRをreact-testing-library(以下rtl)でテストするのは難しい。　　
テストできなくはないが、rtlの設計思想的にCSRでのDOMレンダリングを想定しているため、SSRのテストは実際の動作と乖離がある。