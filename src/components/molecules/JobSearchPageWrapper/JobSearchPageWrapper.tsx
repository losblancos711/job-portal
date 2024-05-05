import React, { useCallback, useEffect, useRef, useState } from "react";
import { JobCard } from "../../atoms/JobCard/JobCard";
import { Job } from "../../../schema/job";

export const JobSearchPageWrapper = () => {
  const [jobData, setJobData] = useState<Job[]>([]);
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
        setJobData(res);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      {jobData?.map((jd) => (
        <JobCard job={jd} />
      ))}
    </div>
  );
};
