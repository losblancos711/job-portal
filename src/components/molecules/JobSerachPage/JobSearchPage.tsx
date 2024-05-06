import React, { useCallback, useEffect, useRef, useState } from "react";
import { JobCard } from "../../atoms/JobCard/JobCard";
import styles from "./JobSearchPage.module.css";
import { Job } from "../../../schema/Job";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setJobs } from "../../../store/jobs/jobSlice";
import { setFilteredJobs } from "../../../store/filter/filterSlice";

interface Header {
  limit: number;
  offset: number;
}

export const JobSearchPage = () => {
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [jobData, setJobData] = useState<Job[]>(jobs || []);
  const headers: Header = { limit: 6, offset: jobData.length };
  const [loading, setLoading] = useState(false);
  let loaderRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
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
    const observer = new IntersectionObserver((elements) => {
      const target = elements[elements.length - 1];
      if (target.isIntersecting) {
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
  }, []);

  return (
    <>
      <div className={`${styles.jobList}`}>
        {jobs?.map((jd) => {
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
