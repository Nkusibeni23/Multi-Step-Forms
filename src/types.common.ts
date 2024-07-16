export interface FORMFIELD {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string;
}

export interface SELECTEDPLAN {
  id: number;
  name: string;
  imageUrl: string;
  pricePerMonth: number;
  pricePerYear: number;
  isSelected: boolean;
  amountPerMonth?: number;
  amountPerYear?: number;
}

export interface ADDON {
  isChosen: boolean;
  type: string;
  description: string;
  pricePerMonth: string;
  pricePerYear: string;
}
