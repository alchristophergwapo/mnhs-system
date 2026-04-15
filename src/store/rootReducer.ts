import { combineSlices } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import { navigationSlice } from "../layout/components/navigation/store/navigationSlice";

export interface LazyLoadedSlices {}

export const rootReducer = combineSlices(
  /**
   * Add your static slices here
   */
  navigationSlice,
  /**
   * Lazy loaded slices will be added here by the dynamic middleware when they are loaded. Do not add any slices here manually, as they will be overwritten when the dynamic middleware adds the lazy loaded slices.
   */
  { [apiService.reducerPath]: apiService.reducer }
).withLazyLoadedSlices<LazyLoadedSlices>();
