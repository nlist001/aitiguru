import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { httpCall, type IQueryParams } from "../services/api.service";
import type { IProduct } from "../models/product.model";
import { immer } from "zustand/middleware/immer";

export interface IProductsStore {
    paginatorData: IProductsOptions;
  products: IProduct[];

  clear: () => void;
  fetchProductsToStore: (queryParams?: IQueryParams) => Promise<void>;
  add: (product: IProduct) => Promise<IProduct>;
  search: (q:string) => Promise<void>;
}

export interface IProductsOptions {
    total: number; 
    skip: number;
    limit: number;
}
export interface IFetchProductsResponse extends IProductsOptions {
    products: IProduct[];
}

export const useProductsStore = create<IProductsStore>()( devtools(persist(immer((set, get) => ({
        paginatorData: {total: 0, skip: 0, limit: 10},
        products: [],

        clear: () => set({ products: [] }),

        fetchProductsToStore: async (queryParams: IQueryParams = {limit:10}): Promise<void> => {
            const _queryParams = {...get().paginatorData, ...queryParams};
            console.log('queryParams',queryParams);
            console.log('_queryParams',_queryParams);
            const res = await httpCall('products',_queryParams) as IFetchProductsResponse;
           
            set({products: res.products});
            const paginatorData: IProductsOptions = { ...res}
            delete paginatorData.products;
            set({paginatorData});

        },
        add: async (product: IProduct): Promise<IProduct> => {
           /*  const res = await httpCall('products',{},{ method:'POST', body: JSON.stringify(product)}) as IFetchProductsResponse;
            if(res){ */
                set((state) => {state.products.push(product);})
            //}
            return httpCall('products/add',{},{ method:'POST', body: JSON.stringify(product)}) as Promise<IProduct>;
        },
        search: async (q:string)=>{
            if (!q) return;
            const res = await httpCall('products',{q}) as IFetchProductsResponse;
            console.log(res)
            set({products: res.products});
        }

    })),
    {
        name: "products-storage",
    }
) ));

