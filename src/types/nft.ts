export interface AttributeRarity {
    trait_type: string;
    value: string;
    rarity: string;
  }
  
  export interface NFT {
    edition: number;
    rarity: number;
    totalRarity: string;
    attributeRarities: AttributeRarity[];
  }
  