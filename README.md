（１１月２６日更新）
# Re:Magic Merchant Game / 魔術商人シミュレーション

[English](./README_EN.md) | 日本語

## 概要

魔術書を売買して人間と魔物の勢力バランスを保つ商人シミュレーションゲーム。プレイヤーは魔術商人として、両勢力の均衡を保ちながら商売を営むことになります。

## 特徴

- **5つの属性**: 火、氷、風、地、雷の魔術書を取り扱い
- **勢力バランス管理**: 人間と魔物の勢力比率を監視
- **動的な市場**: 季節や評判による価格変動システム
- **イベントシステム**: ゲーム世界に影響を与える様々なイベント
- **クラフティング**: 素材を集めて魔術書を作成
- **評判システム**: 両勢力との関係性管理

## 技術スタック

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: Zustand
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React

## ゲームシステム

### 魔術書システム

#### 属性と特徴
- **火属性(FIRE)**: 攻撃的で破壊力重視
- **氷属性(ICE)**: 防御的で安定した性能
- **風属性(WIND)**: 素早さと機動性に特化
- **地属性(EARTH)**: 堅固で信頼性が高い
- **雷属性(LIGHTNING)**: 高威力だが扱いが難しい

#### 素材グレード
- COMMON (一般的)
- UNCOMMON (珍しい)
- RARE (レア)
- EPIC (史詩級)
- LEGENDARY (伝説級)

### 評判システム
- 人間陣営の評判
- 魔物陣営の評判
- 取引による評判変動
- イベントによる評判への影響

### 季節システム
- 春：風属性が強化
- 夏：火と氷属性が人気
- 秋：地属性が重宝
- 冬：氷と火属性が需要増

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/magic-merchant-next.git

# プロジェクトディレクトリに移動
cd magic-merchant-next

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## スクリプト

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "check": "npm run typecheck && npm run lint"
}
```

## コミット規約

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントの更新
style: コードスタイルの修正
refactor: リファクタリング
perf: パフォーマンス改善
test: テストの追加・修正
chore: ビルドプロセスなどの変更
```

## 今後の開発予定

- [ ] セーブ/ロード機能
- [ ] 追加の魔術書属性
- [ ] より複雑なイベントチェーン
- [ ] 実績システム
- [ ] サウンドエフェクトとBGM
- [ ] モバイル対応の改善

## ライセンス

MIT License

## 作者

[poposuke18](https://github.com/poposuke18)

（１１月２５日更新）
# Re:Magic Merchant Game

魔術書を売買して人間と魔物の勢力バランスを保つ商人シミュレーションゲーム。あなたは魔術商人として、両勢力の均衡を保ちながら商売を営むことになります。

## プロジェクト概要

このプロジェクトは、Next.js、TypeScript、Tailwind CSS、Framer Motionを使用した魔術商人シミュレーションゲームです。プレイヤーは魔術書の作成と販売を通じて、人間と魔物の勢力バランスに影響を与えながら利益を追求します。

### 使用技術

- **フレームワーク**: Next.js 14
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: Zustand
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React, Radix UI Icons
- **開発ツール**: ESLint, PostCSS

### ゲームの目的

- 人間と魔物の勢力バランスを50%前後に保ちながら、利益を上げることが目的です
- どちらかの勢力が0%または100%に達するとゲームオーバーとなります
- 様々なイベントに対応しながら、商人としての評判を管理します

## ゲームシステム

### 1. 基本システム

#### 勢力バランス
- 人間勢力と魔物勢力の割合で表示
- 両勢力のバランスが極端に偏るとゲームオーバー
- 商品の販売先によって勢力バランスが変動

#### 経済システム
- 市場トレンドによる価格変動
- 変動率（ボラティリティ）の管理
- 季節による需要の変化

#### 評判システム
- 人間側と魔物側それぞれの評判
- イベントでの選択による評判への影響
- 評判による取引価格への影響

### 2. イベントシステム

#### イベントの種類
- **政治イベント**: 和平会議など、勢力バランスに直接影響
- **自然イベント**: 魔力の嵐など、市場に影響
- **経済イベント**: 商人ギルド集会など、取引に影響
- **社会イベント**: 魔術学院の設立など、長期的な影響
- **魔法イベント**: 元素共鳴など、特定属性に影響

#### イベントの特徴
- 期間限定の効果
- プレイヤーの選択による結果の分岐
- 評判への影響
- 市場価格への影響

### 3. 魔術書システム

#### 属性
- **火属性**: 攻撃的、人間側で人気
- **氷属性**: 防御的、安定した需要
- **風属性**: 機動性、モンスター側で重宝
- **土属性**: 堅実、両陣営で安定需要
- **雷属性**: 高威力、高価格

## プロジェクト構造

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── game/
│   │   ├── AutoProduction.tsx       # 自動生産システム
│   │   ├── CraftingSystem.tsx       # クラフティングシステム
│   │   ├── EventDisplay.tsx         # イベント表示
│   │   ├── EventEffectsDisplay.tsx  # イベント効果表示
│   │   ├── EventManager.tsx         # イベント管理
│   │   ├── GameHeader.tsx           # ゲームヘッダー
│   │   ├── GameOver.tsx            # ゲームオーバー画面
│   │   ├── Inventory.tsx           # インベントリ
│   │   └── StartScreen.tsx         # スタート画面
│   ├── ui/
│   │   ├── Button.tsx              # ボタンコンポーネント
│   │   ├── Card.tsx                # カードコンポーネント
│   │   ├── Dialog.tsx              # ダイアログコンポーネント
│   │   ├── Progress.tsx            # プログレスバー
│   │   └── Tooltip.tsx             # ツールチップ
│   └── shared/
│       ├── ElementIcon.tsx         # 属性アイコン
│       ├── LoadingSpinner.tsx      # ローディング表示
│       └── Notifications.tsx       # 通知システム
├── constants/
│   ├── eventSystem.ts              # イベントシステム定数
│   ├── gameConfig.ts              # ゲーム設定
│   ├── magicSystem.ts             # 魔法システム定数
│   └── seasonSystem.ts            # 季節システム定数
├── hooks/
│   ├── useGame.ts                 # ゲーム状態管理
│   ├── useCrafting.ts            # クラフト機能
│   ├── useInventory.ts           # インベントリ管理
│   ├── useGameTime.ts            # ゲーム内時間管理
│   └── usePowerAnimation.ts      # パワーバーアニメーション
├── lib/
│   ├── store/
│   │   ├── gameStore.ts          # メインゲームストア
│   │   ├── craftingStore.ts      # クラフト状態管理
│   │   └── types.ts              # ストア用型定義
│   └── utils/
│       ├── calculations.ts        # 計算ユーティリティ
│       ├── animations.ts         # アニメーション設定
│       └── formatters.ts         # フォーマット関数
├── styles/
│   └── globals.css               # グローバルスタイル
└── types/
    ├── game.d.ts                # ゲーム関連型定義
    └── magic.d.ts               # 魔法システム型定義

public/
├── fonts/                      # フォントファイル
├── images/                     # 画像ファイル
└── sounds/                     # 音声ファイル（未実装）

config/
├── tailwind.config.js         # Tailwind設定
└── postcss.config.js          # PostCSS設定

### コアコンポーネント

- **EventManager**: イベントの管理と表示
- **EventDisplay**: イベント情報の表示
- **EventEffectsDisplay**: イベント効果の視覚的表示
- **GameHeader**: ゲーム状態の表示
- **CraftingSystem**: 魔術書作成システム

### 状態管理

Zustandを使用して以下の状態を管理:
- ゲームの基本状態（金額、時間など）
- 勢力バランス
- イベント状態
- インベントリ
- 評判システム

## セットアップ方法

```bash
# リポジトリのクローン
git clone https://github.com/poposuke18/Re_magic-merchant-game.git

# プロジェクトディレクトリに移動
cd Re_magic-merchant-game

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 開発ガイドライン

### コーディング規約
- TypeScriptの厳格な型チェックを維持
- コンポーネントは機能ごとに分割
- Tailwind CSSクラスの整理された使用
- アニメーションはFramer Motionを使用

### コミット規約
```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントのみの変更
style: コードの意味に影響を与えない変更（空白、フォーマットなど）
refactor: バグ修正や機能追加を含まないコードの変更
perf: パフォーマンスを向上させるコードの変更
test: テストの追加や既存のテストの修正
chore: ビルドプロセスやツールの変更
```

## 今後の開発予定

- [ ] セーブ/ロード機能の実装
- [ ] イベント履歴システム
- [ ] イベント間の関連性の実装
- [ ] チュートリアルの実装
- [ ] 実績システムの追加
- [ ] サウンドエフェクトとBGM
- [ ] モバイル対応の改善
- [ ] 多言語対応

## コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/awesome-feature`)
3. 変更をコミット (`git commit -am 'Add awesome feature'`)
4. ブランチをプッシュ (`git push origin feature/awesome-feature`)
5. Pull Requestを作成

## ライセンス

MIT License

## 作者

[poposuke18](https://github.com/poposuke18)

