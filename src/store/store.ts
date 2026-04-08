import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./rootReducer";
import { configureStore, Middleware } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof rootReducer>

const middlewares: Middleware[] = []

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
        preloadedState
    });

    setupListeners(store.dispatch);

    return store;
}
 
export const store = makeStore();

export default store;