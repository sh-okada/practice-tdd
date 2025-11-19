# Why?

## なぜCSRにしているのか？
TDDで開発する以上、テスト容易性を高めるには複雑性なSSRをreact-testing-library(以下rtl)でテストするのは難しい。

テストできなくはないが、rtlの設計思想的にCSRでのDOMレンダリングを想定しているため、SSRのテストは実際の動作と乖離がある。

また、できる限りフレームワーク特有の機能を使わずに別のフレームワークなどに移行しやすい設計にしている。

## なぜApp routerじゃないのか？
Suspenseを使うことが前提とされているasync Componentのユニットテストが確立されていない。

現状、ネストされていないasync Componentのテストはrtlでも可能だが、ネストされているとテストできない。[公式](https://nextjs.org/docs/app/guides/testing/jest)でもasync Componentsのテストはe2eで行うことを推奨している。

## なぜtailwindcssじゃないのか？
tailwindcssは素晴らしいライブラリだが、一からスタイリング、アクセシビリティの考慮をする必要があるため現実的ではない。

どうしてもtailwindcssを採用したい場合はheadlessuiなど、アクセシビリティ実装済みのデザインがないCSSライブラリと併用する。