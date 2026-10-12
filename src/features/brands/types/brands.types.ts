
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandsResponse {
  results?: number;
  data: Brand[];
}

export interface BrandResponse {
  data: Brand;
}