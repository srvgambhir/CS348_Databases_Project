import React, { useState } from "react";
import NavBar from "./components/navbar.js";
import { all_cols } from "./constants.js";
import { Option } from "./Dropdown";
import "./styles.css";

function createTables(caption, teamData) {
  const cols = [];
  const rows = [];

  if (teamData.length) {
    const keys = Object.keys(teamData[0]);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "season" || keys[i] === "team") continue;
      rows.push(
        <tr>
          <td>{keys[i]}</td>
          {teamData.map((team) => {
            return <td>{team[keys[i]]}</td>;
          })}
        </tr>
      );
    }
    cols.push(<th key={"team"}>{"teams"}</th>);
    for (let i = 0; i < teamData.length; i++) {
      cols.push(<th key={i}>{teamData[i].team}</th>);
    }
  }

  return (
    <table className={"seasonTable"}>
      <caption>{caption}</caption>
      <tbody>
        <tr>{cols}</tr>
        {rows}
      </tbody>
    </table>
  );
}

function Aggregate() {
  const [seasonOption, setSeasonOption] = useState("2006-2007");
  const [sortBy, setSortBy] = useState("Default");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [seasonData, setSeasonData] = useState({ team_stats: [] });

  const handleSubmit = async (e) => {
    console.log("season", seasonOption);
    e.preventDefault();
    await fetch("/filterBySeason", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ season: seasonOption, sortBy, sortDirection }),
    })
      .then((response) => response.json())
      .then((json) => {
        setSeasonData(json);
        console.log(json);
      });
  };
  return (
    <div>
      <NavBar></NavBar>
      <form onSubmit={handleSubmit} style={{ padding: "3%" }}>
        <label>
          Pick a season:
          <select
            value={seasonOption}
            onChange={(e) => setSeasonOption(e.target.value)}
          >
            <Option value="2006-2007" />
            <Option value="2007-2008" />
            <Option value="2008-2009" />
            <Option value="2009-2010" />
            <Option value="2010-2011" />
            <Option value="2011-2012" />
          </select>
        </label>
        <label style={{ paddingLeft: "3%" }}>
          SortBy
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <Option value="Default" />
            {all_cols.map((col) => {
              if (col !== "Season") {
                return <Option value={col} />;
              }
            })}
          </select>
        </label>
        {sortBy !== "Default" && (
          <label style={{ paddingLeft: "3%" }}>
            SortBy
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <Option value="ASC" />
              <Option value="DESC" />
            </select>
          </label>
        )}
        <input type="submit" value="Submit" />
      </form>
      {createTables(seasonOption, seasonData.team_stats)}
    </div>
  );
}
export default Aggregate;
