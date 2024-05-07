import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./JobSearchPage.module.css";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setJobs } from "../../../store/jobs/jobSlice";
import { JobFilter } from "../JobFilter/JobFilter";
import { setFilteredJobs } from "../../../store/filter/filterSlice";
import { Job } from "../../../schema/job";
import { JobCard } from "../../atoms/JobCard/JobCard";

interface Header {
  limit: number;
  offset: number;
}

// Main page of this application, it renders three components - Filter, loader and Job cards.

export const JobSearchPage = () => {
  // accessing state from redux store
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [jobData, setJobData] = useState<Job[]>(jobs || []);
  const { filteredJobs, hasFilters } = useSelector(
    (state: RootState) => state.filters
  );

  const headers: Header = { limit: 6, offset: jobData.length };

  const [loading, setLoading] = useState(false);
  let loaderRef = useRef<HTMLDivElement>(null);

  // asyncronous function for fetching jobs on page scroll - inifite scrolling
  const fetchJobs = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify(headers);

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
        setJobData([...jobData, ...res]);
        dispatch(setJobs([...jobData, ...res]));
        dispatch(setFilteredJobs([...jobData, ...res]));
        headers.offset += 6;
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Implementation of infinite scrolling with IntersectionObserver web api
    const observer = new IntersectionObserver((elements) => {
      const target = elements[elements.length - 1];
      if (target.isIntersecting && !hasFilters) {
        fetchJobs();
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasFilters]);

  return (
    <>
      <JobFilter />
      <div className={`${styles.jobList}`}>
        {(hasFilters ? filteredJobs : jobs)?.map((jd) => {
          return <JobCard key={jd?.jdUid} job={jd} />;
        })}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
        ref={loaderRef}
      >
        {loading && <CircularProgress />}
      </div>
      <div
        style={{
          marginTop: "50px",
          marginBottom: "50px",
        }}
      ></div>
    </>
  );
};
