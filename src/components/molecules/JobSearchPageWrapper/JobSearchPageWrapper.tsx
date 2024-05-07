import React, { useCallback, useEffect, useState } from "react";
import { JobSearchPage } from "../JobSerachPage/JobSearchPage";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredJobs } from "../../../store/filter/filterSlice";
import { setJobs } from "../../../store/jobs/jobSlice";
import { Job } from "../../../schema/job";

export const JobSearchPageWrapper = () => {
  // accessing state from redux store
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [loading, setLoading] = useState(false);

  // asyncronous function for fetching jobs - only runs on first paint and loads the initial 6 jobs.
  const fetchJobs = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({ limit: 6, offset: 0 });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    setLoading(true);
    await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        const res: Job[] = JSON.parse(data)?.jdList;
        dispatch(setJobs(res));
        dispatch(setFilteredJobs(res));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (jobs?.length && jobs.length < 6) {
      fetchJobs();
    }
  }, []);

  return !loading && <JobSearchPage />;
};
