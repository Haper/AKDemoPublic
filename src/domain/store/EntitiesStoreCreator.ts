import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UseBoundStore, StoreApi } from 'zustand';
import { extractDataFromArray } from "@/infrastructure/tools/ReduxTools";


const PAGE_SIZE = 20;

type BaseEntitiesType<T extends string, EntityType extends { id: number; }> = {
  total: number;
  skip: number;
} & Record<T, EntityType[]>;

export type EntitiesStateType<T extends string, EntityType extends { id: number; }, EntitiesType extends BaseEntitiesType<T, EntityType>> = {
  data: Record<number, EntityType>;
  total: number;
  skip: number;
  ids: number[];
  addEntities: (params?: Record<string, any>) => Promise<[EntitiesType, null] | [null, unknown]>;
  clearEntities: () => void;
};

type ReturnType<T extends string, EntityType extends { id: number; }, EntitiesType extends BaseEntitiesType<T, EntityType>> = {
  useStore: UseBoundStore<StoreApi<EntitiesStateType<T, EntityType, EntitiesType>>>;
  actions: {
    getEntities: (params?: Record<string, any>) => Promise<[EntitiesType, null] | [null, unknown]>;
    clearEntities: () => void;
  };
};

export const createEntitiesStore = <T extends string, EntityType extends { id: number; }, EntitiesType extends BaseEntitiesType<T, EntityType>>(
  name: T,
  getApiFunc: (params?: Record<string, any>) => Promise<EntitiesType>
): ReturnType<T, EntityType, EntitiesType> => {

  const initialState = {
    data: {} as Record<number, EntityType>,
    total: 0,
    skip: -PAGE_SIZE,
    ids: []
  };

  const useStore = create<EntitiesStateType<T, EntityType, EntitiesType>>()(
    devtools(
      (set, get) => ({
        ...initialState,
        addEntities: (payload: EntitiesType) => {
          if (!Array.isArray(payload[name])) return;
          
          if (payload) {
            const data = extractDataFromArray<EntityType>(payload[name]);
            const ids = payload[name].map(entity => entity.id);

            set(state => ({
              total: payload.total,
              skip: payload.skip,
              data: !payload.skip ? data : { ...state.data, ...data },
              ids: !payload.skip ? ids : Array.from(new Set([...state.ids, ...ids]))
            }), undefined, `addEntities: ${name}`);
          }
        },
        clearEntities: () => set(initialState, undefined, `clearEntities: ${name}`)
      }),
      { name }
    )
  );

  type GetEntitiesResponseType = Promise<[EntitiesType, null] | [null, unknown]>;

  const getEntities = async (params?: Record<string, any>): GetEntitiesResponseType => {
    try {
      const response = await getApiFunc(params);
      useStore.getState().addEntities(response);
      return [response, null];

    } catch (error) {
      return [null, error];
    }
  };

  const clearEntities = (): void => {
    useStore.getState().clearEntities();
  };

  return {
    useStore,
    actions: {
      getEntities,
      clearEntities,
    }
  };
};
