import React, { useState } from "react";
import styles from "./JobCard.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Job } from "../../../schema/job";

export interface JobCardProps {
  job?: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const viewJobBtnHandler = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <Card className={`${styles.jobCard}`}>
      <CardContent>
        <>
          <div className={`${styles.jobCardContent}`}>
            <div className={`${styles.company}`}>
              <img
                src={job?.logoUrl}
                alt="Company Name"
                width={25}
                height={35}
              />
              <div className={`${styles.companyInfo}`}>
                <a href={job?.jdLink}>
                  <p>{job?.companyName}</p>
                </a>
                <h2>{job?.jobRole}</h2>
                <p>{job?.location}</p>
              </div>
            </div>
            <div className={styles.salary}>
              <p>
                Estimated Salary:
                {job?.salaryCurrencyCode === "USD"
                  ? ` $${job?.minJdSalary || 0}K - ${job?.maxJdSalary || 0}K ✅`
                  : ` ₹${job?.minJdSalary || 0} - ${
                      job?.maxJdSalary || 0
                    } LPA ✅`}
              </p>
            </div>
            <div className={`${styles.companyDetails}`}>
              <Typography component="p">About Company:</Typography>
              <Typography component="p">About us</Typography>
              {expanded ? (
                <p>{job?.jobDetailsFromCompany}</p>
              ) : (
                <p>{job?.jobDetailsFromCompany?.slice(0, 450)}</p>
              )}
            </div>
          </div>
        </>
      </CardContent>
      <div
        className={
          expanded
            ? `${styles.gradient} ${styles.relative}`
            : `${styles.gradient}`
        }
      >
        <div style={{ textAlign: "center" }}>
          <Button size="small" onClick={viewJobBtnHandler}>
            {expanded ? "View Less" : "View more"}
          </Button>
        </div>
        <Typography variant="caption" component="div">
          Min experience
        </Typography>
        <p>{job?.minExp || "-"}</p>
        <Button className={styles.applyBtn} size="small">
          ⚡ Easy Apply
        </Button>
      </div>
    </Card>
  );
};
