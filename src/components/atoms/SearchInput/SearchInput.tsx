import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  setFilteredJobs,
  setSearchKey,
} from "../../../store/filter/filterSlice";
import styles from "../SelectSingle/SelectSingle.module.css";

export const SearchInput = () => {
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let key = e?.target?.value;
    setInputVal(key);

    // debouncing for smooth user exerience
    setTimeout(() => {
      dispatch(setSearchKey(key));
      dispatch(setFilteredJobs(jobs));
    }, 2000);
  };

  return (
    <div style={{ marginTop: inputVal ? "8px" : "24px", marginLeft: "5px" }}>
      {inputVal ? (
        <div style={{ fontSize: "13px", fontWeight: 500 }}>
          Search Company Name
        </div>
      ) : (
        ""
      )}
      <TextField
        size="small"
        placeholder="Search Company Name"
        className={styles.searchInput}
        onChange={changeHandler}
        name="search"
      />
    </div>
  );
};
