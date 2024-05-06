import { AvailableFilters } from "../schema/filter";
import { Job } from "../schema/job";
import { FilterState } from "../store/filter/filterSlice";

export const filterJobs = (
  jobs?: Job[],
  filters?: FilterState,
  allAppliedFilters?: AvailableFilters[]
) => {
  if (!jobs?.length || !allAppliedFilters?.length) {
    return jobs;
  }

  let allFilteredJobs: Job[] = jobs;

  if (allAppliedFilters?.includes(AvailableFilters.ROLE)) {
    allFilteredJobs = allFilteredJobs?.filter((job) =>
      filters?.selectedRoles?.some(
        (role) => role?.toLowerCase() === job?.jobRole?.toLowerCase()
      )
    );
  }

  if (allAppliedFilters?.includes(AvailableFilters.LOCATION)) {
    allFilteredJobs = allFilteredJobs?.filter((job) =>
      filters?.selectedLocations?.some(
        (loc) => loc?.toLowerCase() === job?.location?.toLowerCase()
      )
    );
  }

  if (allAppliedFilters?.includes(AvailableFilters.MINBASEPAY)) {
    allFilteredJobs = allFilteredJobs?.filter((job) =>
      filters?.selectedMinBasePay && job?.minJdSalary
        ? +job.minJdSalary >= +filters.selectedMinBasePay
        : undefined
    );
  }

  if (allAppliedFilters?.includes(AvailableFilters.MINEXPERIENCE)) {
    allFilteredJobs = allFilteredJobs?.filter((job) =>
      filters?.selectedMinExperience && job?.minExp
        ? filters?.selectedMinExperience >= job?.minExp
        : undefined
    );
  }

  if (allAppliedFilters?.includes(AvailableFilters.SEARCH)) {
    allFilteredJobs = allFilteredJobs?.filter((job) =>
      filters?.searchKey
        ? job?.companyName
            ?.toLowerCase()
            ?.includes(filters?.searchKey?.toLowerCase())
        : ""
    );
  }

  return allFilteredJobs;
};
