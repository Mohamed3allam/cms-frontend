import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import heroReducer from "./slices/heroSlice";
import serviceReducer from "./slices/servicesSlice";
import teamMemberReducer from "./slices/teamMembersSlice";
import clientsReducer from "./slices/clientsSlice";
import settingsReducer from "./slices/settingsSlice";

const combinedReducer = combineReducers({
  heroSlides: heroReducer,
  services: serviceReducer,
  teamMembers: teamMemberReducer,
  clients: clientsReducer,
  settings: settingsReducer,
});

const reducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: any
) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
