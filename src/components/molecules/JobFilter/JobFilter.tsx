import React from "react";
import { AvailableFilters } from "../../../schema/filter";
import MultipleSelectChip from "../../atoms/MultipleSelectChip/MultipleSelectChip";
import { SearchInput } from "../../atoms/SearchInput/SearchInput";
import SelectSingle from "../../atoms/SelectSingle/SelectSingle";
import style from "./JobFilter.module.css";

export const JobFilter = () => {
  return (
    <div className={style.jobFilter}>
      <MultipleSelectChip
        name={AvailableFilters.ROLE}
        label="Roles"
        selectValues={["frontend", "ios", "android", "tech lead"]}
      />
      <SelectSingle
        name={AvailableFilters.MINEXPERIENCE}
        menuItems={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        minWidth={125}
        label="Experience"
      />
      <MultipleSelectChip
        name={AvailableFilters.LOCATION}
        selectValues={[
          "delhi ncr",
          "mumbai",
          "chennai",
          "banglore",
          "hyderabad",
          "remote",
        ]}
        label="Locations"
      />
      <SelectSingle
        name={AvailableFilters.MINBASEPAY}
        menuItems={[5, 10, 20, 30, 40, 50, 60, 70]}
        minWidth={185}
        label="Minimum Base Salary"
      />
      <SearchInput />
    </div>
  );
};
