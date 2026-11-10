import { BaseModel } from './base.model';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  sku: string;
  stock: number;
  tags: string[];
  brand: string;
  weight: number;
  thumbnail: string;
}
export class ProductModel extends BaseModel  implements IProduct {
    id = Math.round(Math.random()*10000000000);
    title = '';
    description = '';
    category = '';
    price = 0;
    discountPercentage = 0;
    rating = 0;
    sku = '';
    stock = 0;
    tags = [];
    brand = '';
    weight = 0;
    thumbnail = '';

    constructor(o?: any) {
        super();
        super.checkFields(o);
    }
}

/* 
  warrantyInformation: 1 month warranty,
  shippingInformation: Ships in 1 month,
  availabilityStatus: Low Stock,
  reviews: [
    {
      rating: 2,
      comment: Very unhappy with my purchase!,
      date: 2024-05-23T08:56:21.618Z,
      reviewerName: John Doe,
      reviewerEmail: john.doe@x.dummyjson.com
    },
    {
      rating: 2,
      comment: Not as described!,
      date: 2024-05-23T08:56:21.618Z,
      reviewerName: Nolan Gonzalez,
      reviewerEmail: nolan.gonzalez@x.dummyjson.com
    },
    {
      rating: 5,
      comment: Very satisfied!,
      date: 2024-05-23T08:56:21.618Z,
      reviewerName: Scarlett Wright,
      reviewerEmail: scarlett.wright@x.dummyjson.com
    }
  ],
  returnPolicy: 30 days return policy,
  minimumOrderQuantity: 24,
  meta: {
    createdAt: 2024-05-23T08:56:21.618Z,
    updatedAt: 2024-05-23T08:56:21.618Z,
    barcode: 9164035109868,
    qrCode: ...
  },
  thumbnail: ...,
  images: [..., ..., ...]
} */