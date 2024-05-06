import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import {
  setFilteredJobs,
  updateSelectedLocations,
  updateSelectedRoles,
} from "../../../store/filter/filterSlice";
import { useState } from "react";
import { AvailableFilters } from "../../../schema/filter";
import { IconButton, Input } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MultipleSelectChip.module.css";

export interface MultipleSelectChipProps {
  selectValues: string[];
  label?: string;
  name: string;
}

export default function MultipleSelectChip({
  selectValues,
  label,
  name,
}: MultipleSelectChipProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const dispatch = useDispatch();

  const computeDispatchFns = (
    values: string | string[],
    clearAll?: boolean
  ) => {
    clearAll && setSelectedChips([]);
    switch (name) {
      case AvailableFilters.ROLE:
        dispatch(updateSelectedRoles(clearAll ? [] : values));
        break;
      case AvailableFilters.LOCATION:
        dispatch(updateSelectedLocations(clearAll ? [] : values));
        break;
      default:
        break;
    }
    dispatch(setFilteredJobs(jobs));
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedChips>) => {
    const {
      target: { value },
    } = event;
    setSelectedChips(typeof value === "string" ? value.split(",") : value);
    computeDispatchFns(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <div style={{ fontSize: "13px", fontWeight: 500 }}>{label}</div>
        <Select
          style={{ paddingRight: "80px" }}
          className={styles.multipleSel}
          multiple
          name={name}
          value={selectedChips}
          onChange={handleChange}
          input={
            <OutlinedInput
              onClick={() => {
                showMenu ? setShowMenu(false) : setShowMenu(true);
              }}
            />
          }
          renderValue={(selected) => (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "no-wrap",
                  gap: 0.5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {selected.map((value) => {
                  return (
                    <Chip
                      className={styles.chips}
                      key={value}
                      label={value}
                      size="small"
                      onDelete={() => {
                        const listWithoutDelEl = selectedChips.filter(
                          (chip) => chip !== value
                        );
                        setSelectedChips(listWithoutDelEl);
                        computeDispatchFns(listWithoutDelEl);
                        dispatch(setFilteredJobs(jobs));
                      }}
                    />
                  );
                })}
              </Box>
              <IconButton
                onClick={() => computeDispatchFns([], true)}
                aria-label="delete"
                size="small"
                className={styles.delIcon}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
          open={showMenu}
        >
          {selectValues
            .filter((value) => selectedChips.every((chip) => value !== chip))
            ?.map((name) => (
              <MenuItem className={styles.menuItem} key={name} value={name}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
