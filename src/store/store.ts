import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./rootReducer";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import { dynamicMiddleware } from "./middleware";

export type RootState = ReturnType<typeof rootReducer>

const middlewares: Middleware[] = [apiService.middleware, dynamicMiddleware];

/**
 * Creates a store with the given preloaded state.
 * @param {Partial<RootState>} [preloadedState] - The preloaded state to use when creating the store.
 * @returns {AppStore} - The created store.
 */
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

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

export default store;