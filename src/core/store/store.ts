import {action, Action, createStore, createTypedHooks} from 'easy-peasy';

export const store = createStore<StoreModel>({
  userJWT: null,
  updateJWT: action((state, payload: string | null) => {
    state.userJWT = payload;
  }),
});

interface StoreModel {
  userJWT: string | null;
  updateJWT: Action<StoreModel, string | null>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
