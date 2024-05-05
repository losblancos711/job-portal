import React, { useState } from "react";
import styles from "./JobCard.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
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
            <div className={`${styles.companyDetails}`}>
              <Avatar alt="Company Name" src={job?.logoUrl} />
              <div>
                <a href={job?.jdLink}>
                  <p>{job?.companyName}</p>
                </a>
                <h2>{job?.jobRole}</h2>
              </div>
              <p>{job?.location}</p>
            </div>
            <div className={`${styles.companyDetails}`}>
              <Typography variant="h4" component="div">
                About Company:
              </Typography>
              <Typography variant="h6" component="div">
                About us
              </Typography>
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
        <Button size="small" onClick={viewJobBtnHandler}>
          {expanded ? "View Less" : "View more"}
        </Button>
        <Typography variant="caption" component="div">
          Min experience
        </Typography>
        <p>{job?.minExp}</p>
        <Button size="small">Easy Apply</Button>
      </div>
    </Card>
  );
};
