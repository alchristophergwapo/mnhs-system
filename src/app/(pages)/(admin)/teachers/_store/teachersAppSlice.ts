import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
  WithSlice,
} from "@reduxjs/toolkit";
import { rootReducer } from "@/src/store/rootReducer";
const teachersAdapter = createEntityAdapter();

const emptyInitialState = teachersAdapter.getInitialState({
  data: [],
  isLoading: false,
  error: null,
});

const initialState = teachersAdapter.upsertMany(emptyInitialState, []);

export const { selectAll: selectAllTeachers } = teachersAdapter.getSelectors();

// Creates a teachers slice
export const teachersAppSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    getTeacherById: (state, action: PayloadAction<EntityId>) => {
      
    }
  },
});

rootReducer.inject(teachersAppSlice);
const injectedSlice = teachersAppSlice.injectInto(rootReducer);
declare module "@/src/store/rootReducer" {
  export interface LazyLoadedSlices extends WithSlice<
    typeof teachersAppSlice
  > {}
}

export const {} = injectedSlice.selectors;

export const {  } = teachersAppSlice.actions;

export default teachersAppSlice.reducer;
