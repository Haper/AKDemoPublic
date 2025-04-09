import { 
  createEntitiesStore,
  EntitiesStateType
 } from "./EntitiesStoreCreator";
import API from "@/domain/api/clientAPI";
import { User, Users } from "@/domain/api/Types";


export type UsersStateType = EntitiesStateType<'users', User, Users>;

const {
  useStore: useUsersStore,
  actions: {
    getEntities: getUsers,
    clearEntities: clearUserList
  }
} = createEntitiesStore<'users', User, Users>('users', API.getUsers);

const useUserStore = (id: number) => useUsersStore.getState().data[id];

export {
  useUsersStore,
  useUserStore,
  getUsers,
  clearUserList
};
