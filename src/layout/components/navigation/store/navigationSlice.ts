import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlatNavigationItemType, NavigationItemType } from "../types/NavigationItemType";
import { RootState } from "@/src/store/store";
import { adminNavigationConfig } from "@/src/configs/adminNavigationConfig";
import NavigationHelper from "@/src/utils/navigationHelper";

const navigationAdapter = createEntityAdapter<FlatNavigationItemType>();

const emptyInitialState = navigationAdapter.getInitialState();

const initialState = navigationAdapter.upsertMany(
        emptyInitialState,
        NavigationHelper.flattenNavigationItems(adminNavigationConfig)
    )

export const {
    selectAll: selectAllNavigation,
} = navigationAdapter.getSelectors<RootState>((state) => state.navigation);

/**
 * Navigation slice for managing navigation state in the application.
 * This slice uses createEntityAdapter to manage a collection of navigation items.
 * The initial state is populated with flattened navigation items from the adminNavigationConfig.
 */
export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setNavigation: (state, action: PayloadAction<NavigationItemType>) => {
            return navigationAdapter.setAll(state, NavigationHelper.flattenNavigationItems([action.payload]));
        },
		resetNavigation: () => initialState
    },
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;