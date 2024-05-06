import { createSlice } from "@reduxjs/toolkit";
import { filterJobs } from "../../helpers/filterJobs";
import { WorkMode, AvailableFilters } from "../../schema/filter";
import { Job } from "../../schema/job";

export interface FilterState {
  filteredJobs?: Job[];
  selectedRoles?: string[];
  selectedLocations?: string[];
  selectedMinExperience?: number;
  selectedCompanyName?: string;
  selectedWorkMode?: WorkMode;
  selectedMinBasePay?: number;
  searchKey?: string;
  hasFilters: boolean;
  updateSelectedRoles: (roles?: string[]) => void;
  updateSelectedLocations: (loc?: string[]) => void;
  updateSelectedWorkMode: (mode?: WorkMode) => void;
  updateSelectedMinBasePay: (pay?: string) => void;
  updateSelectedMinExperience: (exp?: string) => void;
  setSearchKey: (key?: string) => void;
  setFilteredJobs: (filteredJobs?: Job[]) => void;
}

const initialState: FilterState = {
  filteredJobs: [],
  hasFilters: false,
  updateSelectedRoles: () => undefined,
  updateSelectedLocations: () => undefined,
  updateSelectedWorkMode: () => undefined,
  updateSelectedMinBasePay: () => undefined,
  updateSelectedMinExperience: () => undefined,
  setSearchKey: () => undefined,
  setFilteredJobs: () => undefined,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateSelectedRoles: (state, action) => {
      state.selectedRoles = action.payload;
    },
    updateSelectedMinExperience: (state, action) => {
      state.selectedMinExperience = action.payload;
    },
    updateSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload;
    },
    updateSelectedWorkMode: (state, action) => {
      state.selectedWorkMode = action.payload;
    },
    updateSelectedMinBasePay: (state, action) => {
      state.selectedMinBasePay = action.payload;
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    setFilteredJobs: (state, action) => {
      const allAppliedFilters: AvailableFilters[] = [];
      if (state?.selectedRoles?.length) {
        allAppliedFilters.push(AvailableFilters.ROLE);
      }
      if (state?.selectedLocations?.length) {
        allAppliedFilters.push(AvailableFilters.LOCATION);
      }
      if (state?.selectedMinExperience) {
        allAppliedFilters.push(AvailableFilters.MINEXPERIENCE);
      }
      if (state?.selectedMinBasePay) {
        allAppliedFilters.push(AvailableFilters.MINBASEPAY);
      }
      if (state?.searchKey) {
        allAppliedFilters.push(AvailableFilters.SEARCH);
      }
      state.hasFilters = allAppliedFilters.length >= 1;
      state.filteredJobs = allAppliedFilters?.length
        ? filterJobs(action.payload, state, allAppliedFilters)
        : state.filteredJobs;
    },
  },
});

export const {
  updateSelectedLocations,
  updateSelectedMinBasePay,
  updateSelectedMinExperience,
  updateSelectedRoles,
  updateSelectedWorkMode,
  setFilteredJobs,
  setSearchKey,
} = filterSlice.actions;

export default filterSlice.reducer;
