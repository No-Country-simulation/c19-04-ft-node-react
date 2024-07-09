export const handlePending = (state) => {
  state.status = "loading";
};

export const handleFulfilled = (state, action) => {
  state.status = "succeeded";
  state.currentUser = action.payload;
  state.error = null;
};

export const handleRejected = (state, action) => {
  state.status = "failed";
  state.error = action.payload || action.error.message;
  state.currentUser = null;
};
