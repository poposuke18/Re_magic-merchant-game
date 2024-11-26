// src/constants/magicSystem.ts
import { Element} from '@/types/game.d';

export type MaterialGrade = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
export type MaterialType = 'CRYSTAL' | 'ESSENCE' | 'CORE' | 'SHARD' | 'DUST';

export interface MaterialBase {
    id: string;
    name: string;
    description: string;
    price: number;
    grade: MaterialGrade;
    type: MaterialType;
    element: Element;
  }

  export interface MagicBookTier {
    level: number;
    name: string;
    requiredMaterials: {
      type: MaterialType;
      grade: MaterialGrade;
      amount: number;
    }[];
  }

  export interface MagicElement {
    id: Element;
    name: string;
    description: string;
    tiers: MagicBookTier[];
    materials: MaterialBase[];
  }

  export const MAGIC_ELEMENTS: Record<Element, MagicElement> = {
      FIRE: {
          id: 'FIRE',
          name: '炎焔',
          description: '破壊的な力を秘めた炎の魔法',
          tiers: [
              {
                  level: 1,
                  name: '火の魔導書',
                  requiredMaterials: [
                      { type: 'CRYSTAL', grade: 'COMMON', amount: 2 },
                      { type: 'DUST', grade: 'COMMON', amount: 1 }
                  ]
              },
              {
                  level: 2,
                  name: '火炎魔導書',
                  requiredMaterials: [
                      { type: 'CRYSTAL', grade: 'UNCOMMON', amount: 2 },
                      { type: 'ESSENCE', grade: 'COMMON', amount: 1 }
                  ]
              },
              {
                  level: 3,
                  name: '業火の魔導書',
                  requiredMaterials: [
                      { type: 'CORE', grade: 'RARE', amount: 1 },
                      { type: 'ESSENCE', grade: 'UNCOMMON', amount: 2 }
                  ]
              }
          ],
          materials: [
              {
                  id: 'fire-crystal',
                  name: '火晶石',
                  description: '火の力を宿した結晶',
                  price: 100,
                  grade: 'COMMON',
                  type: 'CRYSTAL',
                  element: 'FIRE'
              },
              {
                  id: 'flame-essence',
                  name: '炎の精髄',
                  description: '純粋な炎の力が凝縮されたエッセンス',
                  price: 250,
                  grade: 'UNCOMMON',
                  type: 'ESSENCE',
                  element: 'FIRE'
              },
              {
                  id: 'inferno-core',
                  name: '獄炎核',
                  description: '地獄の業火から抽出された魔力の核',
                  price: 500,
                  grade: 'RARE',
                  type: 'CORE',
                  element: 'FIRE'
              }
          ]
      },
      ICE: {
          id: 'ICE',
          name: '氷霜',
          description: '万物を凍てつかせる氷の魔法',
          tiers: [
              {
                  level: 1,
                  name: '氷の魔導書',
                  requiredMaterials: [
                      { type: 'CRYSTAL', grade: 'COMMON', amount: 2 },
                      { type: 'DUST', grade: 'COMMON', amount: 1 }
                  ]
              },
              {
                  level: 2,
                  name: '氷結魔導書',
                  requiredMaterials: [
                      { type: 'CRYSTAL', grade: 'UNCOMMON', amount: 2 },
                      { type: 'ESSENCE', grade: 'COMMON', amount: 1 }
                  ]
              },
              {
                  level: 3,
                  name: '絶氷の魔導書',
                  requiredMaterials: [
                      { type: 'CORE', grade: 'RARE', amount: 1 },
                      { type: 'ESSENCE', grade: 'UNCOMMON', amount: 2 }
                  ]
              }
          ],
          materials: [
              {
                  id: 'ice-crystal',
                  name: '氷晶石',
                  description: '永遠の氷を閉じ込めた結晶',
                  price: 100,
                  grade: 'COMMON',
                  type: 'CRYSTAL',
                  element: 'FIRE'
              },
              {
                  id: 'frost-essence',
                  name: '霜の精髄',
                  description: '絶対零度の力を秘めたエッセンス',
                  price: 250,
                  grade: 'UNCOMMON',
                  type: 'ESSENCE',
                  element: 'FIRE'
              },
              {
                  id: 'glacier-core',
                  name: '氷河核',
                  description: '万年氷河から抽出された魔力の核',
                  price: 500,
                  grade: 'RARE',
                  type: 'CORE',
                  element: 'FIRE'
              }
          ]
      },
      WIND: {
        id: 'WIND',
        name: '疾風',
        description: '素早く切り裂く風の魔法',
        tiers: [
          {
            level: 1,
            name: '風の魔導書',
            requiredMaterials: [
              { type: 'CRYSTAL', grade: 'COMMON', amount: 2 },
              { type: 'DUST', grade: 'COMMON', amount: 1 }
            ]
          },
          {
            level: 2,
            name: '疾風魔導書',
            requiredMaterials: [
              { type: 'CRYSTAL', grade: 'UNCOMMON', amount: 2 },
              { type: 'ESSENCE', grade: 'COMMON', amount: 1 }
            ]
          },
          {
            level: 3,
            name: '竜巻の魔導書',
            requiredMaterials: [
              { type: 'CORE', grade: 'RARE', amount: 1 },
              { type: 'ESSENCE', grade: 'UNCOMMON', amount: 2 }
            ]
          }
        ],
        materials: [
          {
            id: 'wind-crystal',
            name: '風晶石',
            description: '風の力を閉じ込めた結晶',
            price: 100,
            grade: 'COMMON',
            type: 'CRYSTAL',
            element: 'WIND'
          },
          {
            id: 'gale-essence',
            name: '疾風の精髄',
            description: '荒々しい風の力が凝縮されたエッセンス',
            price: 250,
            grade: 'UNCOMMON',
            type: 'ESSENCE',
            element: 'WIND'
          },
          {
            id: 'tempest-core',
            name: '暴風核',
            description: '巨大な竜巻から抽出された魔力の核',
            price: 500,
            grade: 'RARE',
            type: 'CORE',
            element: 'WIND'
          }
        ]
      },
      
      EARTH: {
        id: 'EARTH',
        name: '大地',
        description: '堅固な大地の力を宿した魔法',
        tiers: [
          {
            level: 1,
            name: '土の魔導書',
            requiredMaterials: [
              { type: 'CRYSTAL', grade: 'COMMON', amount: 2 },
              { type: 'DUST', grade: 'COMMON', amount: 1 }
            ]
          },
          {
            level: 2,
            name: '大地魔導書',
            requiredMaterials: [
              { type: 'CRYSTAL', grade: 'UNCOMMON', amount: 2 },
              { type: 'ESSENCE', grade: 'COMMON', amount: 1 }
            ]
          },
          {
            level: 3,
            name: '山脈の魔導書',
            requiredMaterials: [
              { type: 'CORE', grade: 'RARE', amount: 1 },
              { type: 'ESSENCE', grade: 'UNCOMMON', amount: 2 }
            ]
          }
        ],
        materials: [
          {
            id: 'earth-crystal',
            name: '地晶石',
            description: '大地の力を封じ込めた結晶',
            price: 100,
            grade: 'COMMON',
            type: 'CRYSTAL',
            element: 'EARTH'
          },
          {
            id: 'terra-essence',
            name: '大地の精髄',
            description: '大地の重厚な力が凝縮されたエッセンス',
            price: 250,
            grade: 'UNCOMMON',
            type: 'ESSENCE',
            element: 'EARTH'
          },
          {
            id: 'mountain-core',
            name: '山脈核',
            description: '古代の山脈から抽出された魔力の核',
            price: 500,
            grade: 'RARE',
            type: 'CORE',
            element: 'EARTH'
          }
        ]
      },
    
      LIGHTNING: {
        id: 'LIGHTNING',
        name: '雷電',
        description: '稲妻の如き鋭い魔法',
        tiers: [
          {
            level: 1,
            name: '雷の魔導書',
            requiredMaterials: [
              { type: 'CRYSTAL', grade: 'COMMON', amount: 2 },
              { type: 'DUST', grade: 'COMMON', amount: 1 }
            ]
          },
          {
            level: 2,
            name: '雷電魔導書',
            requiredMaterials: [
              { type: 'CRYSTAL', grade: 'UNCOMMON', amount: 2 },
              { type: 'ESSENCE', grade: 'COMMON', amount: 1 }
            ]
          },
          {
            level: 3,
            name: '轟雷の魔導書',
            requiredMaterials: [
              { type: 'CORE', grade: 'RARE', amount: 1 },
              { type: 'ESSENCE', grade: 'UNCOMMON', amount: 2 }
            ]
          }
        ],
        materials: [
          {
            id: 'lightning-crystal',
            name: '雷晶石',
            description: '稲妻の力を封じた結晶',
            price: 100,
            grade: 'COMMON',
            type: 'CRYSTAL',
            element: 'LIGHTNING'
          },
          {
            id: 'thunder-essence',
            name: '雷電の精髄',
            description: '雷霆の力が凝縮されたエッセンス',
            price: 250,
            grade: 'UNCOMMON',
            type: 'ESSENCE',
            element: 'LIGHTNING'
          },
          {
            id: 'storm-core',
            name: '雷霆核',
            description: '巨大な雷雲から抽出された魔力の核',
            price: 500,
            grade: 'RARE',
            type: 'CORE',
            element: 'LIGHTNING'
          }
        ]
      }
  };

// 素材のグレードに応じた色定義
export const GRADE_COLORS = {
  COMMON: 'text-gray-500',
  UNCOMMON: 'text-green-500',
  RARE: 'text-blue-500',
  EPIC: 'text-purple-500',
  LEGENDARY: 'text-yellow-500'
};

// 素材の組み合わせレシピ
export interface CraftingRecipe {
  id: string;
  name: string;
  materials: {
    id: string;
    amount: number;
  }[];
  result: {
    type: MaterialType;
    grade: MaterialGrade;
  };
}

export const CRAFTING_RECIPES: CraftingRecipe[] = [
  {
    id: 'common-essence',
    name: '基本精髄製造',
    materials: [
      { id: 'fire-crystal', amount: 3 },
      { id: 'magic-dust', amount: 2 }
    ],
    result: {
      type: 'ESSENCE',
      grade: 'COMMON'
    }
  },
  // 他のレシピも定義...
];