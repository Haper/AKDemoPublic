import { 
  createEntitiesStore,
  EntitiesStateType
 } from "./EntitiesStoreCreator";
import API from "@/domain/api/clientAPI";
import { Product, Products } from "@/domain/api/Types";


export type ProductsStateType = EntitiesStateType<'products', Product, Products>;

const {
  useStore: useProductsStore,
  actions: {
    getEntities: getProducts,
    clearEntities: clearProductList
  }
} = createEntitiesStore<'products', Product, Products>('products', API.getProducts);

const useProductStore = (id: number) => useProductsStore.getState().data[id];

export {
  useProductsStore,
  useProductStore,
  getProducts,
  clearProductList
};
