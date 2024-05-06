import React, { useCallback, useEffect, useRef, useState } from "react";
import { JobSearchPage } from "../JobSerachPage/JobSearchPage";
import { Job } from "../../../schema/Job";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredJobs } from "../../../store/filter/filterSlice";
import { setJobs } from "../../../store/jobs/jobSlice";

export const JobSearchPageWrapper = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [loading, setLoading] = useState(false);

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
