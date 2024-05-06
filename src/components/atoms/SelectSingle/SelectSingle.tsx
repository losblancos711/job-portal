import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { AvailableFilters } from "../../../schema/filter";
import {
  setFilteredJobs,
  updateSelectedMinBasePay,
  updateSelectedMinExperience,
} from "../../../store/filter/filterSlice";
import { RootState } from "../../../store/store";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./SelectSingle.module.css";

export interface SelectSingleProps {
  menuItems: string[] | number[];
  label?: string;
  name: string;
}

export default function SelectSingle({
  menuItems,
  label,
  name,
}: SelectSingleProps) {
  const [value, setValue] = React.useState("");
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  const computeDispatchFns = (values: string | number, clearAll?: boolean) => {
    clearAll && setValue("");
    switch (name) {
      case AvailableFilters.MINBASEPAY:
        dispatch(updateSelectedMinBasePay(clearAll ? "" : values));
        break;
      case AvailableFilters.MINEXPERIENCE:
        dispatch(updateSelectedMinExperience(clearAll ? "" : values));
        break;
      default:
        break;
    }
    dispatch(setFilteredJobs(jobs));
  };
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    computeDispatchFns(event?.target?.value?.toString()?.replace("L", ""));
  };
  return (
    <Box sx={{ minWidth: 110, mt: 1 }}>
      <FormControl fullWidth>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            textAlign: "left",
            marginTop: value ? 0 : "16px",
          }}
        >
          {value ? label : ""}
        </div>
        {value ? (
          <IconButton
            onClick={() => computeDispatchFns("", true)}
            aria-label="delete"
            size="small"
            className={styles.delIcon}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          ""
        )}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className={styles.singleSel}
          value={value}
          onChange={handleChange}
        >
          {menuItems.map((item, i) => {
            return (
              <MenuItem className={styles.menuItem} key={i} value={item}>
                {name === AvailableFilters.MINEXPERIENCE ? item : `${item}L`}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
