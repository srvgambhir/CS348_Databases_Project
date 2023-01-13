import React, { useState, useEffect, useCallback } from "react";
import { mapClientToDb } from "../constants";
import { Option } from "../Dropdown";
function FilterOptionsDropDown(props) {
  const { filterOptions, team, table, setFilterData, type, dbColumns, season } = props;
  const [filter, setFilter] = useState("");

  const handleSubmit = async (e) => {
    console.log(table, "team", team, filter);

    const dbFilterMap = mapClientToDb(filterOptions, dbColumns);
    if (!team || !filter || !table || !season) {
      return;
    }
    e.preventDefault();
    await fetch("/filterByStat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team,
        table,
        filter: dbFilterMap.get(filter),
        type,
        season,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setFilterData(json);
        console.log("json", json);
      });
  };

  useEffect(() => {
    if (!filter.length) {
      setFilterData([]);
    }
  }, [filter]);

  useEffect(() => {
    setFilter("");
  }, [team]);

  return (
    <div className="FilterOptionsDropDown">
      <form onSubmit={handleSubmit}>
        <label>
          Filter by stat
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <Option value={""} />
            {filterOptions.map((option, key) => {
              return <Option key={key} value={option} />;
            })}
          </select>
        </label>
        <input type="submit" value="Go" />
      </form>
    </div>
  );
}

export default FilterOptionsDropDown;
