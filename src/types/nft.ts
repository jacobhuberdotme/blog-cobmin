export interface AttributeRarity {
  trait_type: string;
  value: string;
  rarity: string;
}

export interface NFT {
  edition: number;
  rarity: number;
  imageUrl: string;
  totalRarity: string;
  attributeRarities: AttributeRarity[];
  name?: string;
  description?: string;
}
