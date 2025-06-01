import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authDetails",
  initialState: {
    currentUser: null,
    isError: false,
    isLoading: false,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setError(state, action) {
      state.isError = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    clearState(state) {
      state.isError = false;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
export const { setUser, setError, setLoading, clearState } = authSlice.actions;
