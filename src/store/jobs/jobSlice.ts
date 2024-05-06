import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Job } from "../../schema/job";

export interface JobSearchState {
  jobs?: Job[];
  setJobs: (jobs?: Job[]) => void;
}

const initialState: JobSearchState = {
  jobs: [],
  setJobs: () => undefined,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = state.jobs?.concat(action.payload);
    },
  },
});

export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;
