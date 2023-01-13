import React, { useState } from "react";
import FilterOptionsDropDown from "./components/filterOptions";
import "react-toastify/dist/ReactToastify.css";

import {
  TEAM_SEASON_TABLE,
  team_cols,
  offensive_cols,
  possesion_cols,
  defensive_cols,
  gk_cols,
  GOALKEEPER,
  DEFENSIVE,
  POSSESSION,
  OFFENSIVE,
  TEAM_STATS,
  db_offensive_cols,
  db_possesion_cols,
  db_defensive_cols,
  db_gk_cols,
  db_team_cols,
  OFFENSIVE_TABLE,
  POSSESSION_TABLE,
  DEFENSIVE_TABLE,
  GOALKEEPER_TABLE,
} from "./constants";
import { Option } from "./Dropdown";
import "./styles.css";
import NavBar from "./components/navbar.js";
function createTables(caption, columns, dbColumns, type, teamData, filtered) {
  const cols = [];
  const useRows = [];
  let mapColumnsObject = teamData[type];
  if (mapColumnsObject) {
    mapColumnsObject = mapColumnsObject[0];
  }
  for (let i = 0; i < columns.length; i++) {
    if (filtered) {
      if (mapColumnsObject && mapColumnsObject[dbColumns[i]] != null) {
        cols.push(<th key={i}>{columns[i]}</th>);
        useRows.push(dbColumns[i]);
      }
    } else {
      cols.push(<th key={i}>{columns[i]}</th>);
      useRows.push(dbColumns[i]);
    }
  }

  const rows = [];
  if (teamData[type]?.length) {
    for (let i = 0; i < teamData[type].length; i++) {
      rows.push(
        <tr key={i}>
          {useRows.map((r) => {
            return <td>{teamData[type][i][filtered ? r : r.toLowerCase()]}</td>;
          })}
        </tr>
      );
    }
  }

  return (
    <table>
      <caption>{caption}</caption>
      <tbody>
        <tr>{cols}</tr>
        {rows}
      </tbody>
    </table>
  );
}

const team_cols1 = ["Wins", "Losses"];
const offensive_cols1 = [
  "Goals",
  "Fast break goals",
  "Goals inside box",
  "Goals outisde box",
  "Header goals",
  "Penalty goals",
  "Freekick goals",
  "Shots",
  "Shots on target",
  "Big chances missed",
];
const possesion_cols1 = [
  "Total Passes",
  "Total crosses",
  "Total long balls",
  "Total through balls",
  "Touches",
  "Backward Passes",
  "Corners Taken",
  "Dispossesed",
  "Total offsides",
];
const defensive_cols1 = [
  "Goals conceded",
  "Clearences",
  "Interceptions",
  "Clean sheets",
  "Blocks",
  "line clearences",
  "Headed clearences",
  "Last man tackles",
  "Red cards",
  "Yellow cards",
  "Penalties conceded",
  "Peanlty goals conceded",
  "Own goals",
];
const gk_cols1 = ["Saves", "Punches", "Claims", "Penalty saves"];

function App() {
  const [option, setOption] = useState("Click to see options");
  const [teamData, setTeamData] = useState({});
  const [seasonOption, setSeasonOption] = useState("Click to see options");

  const [option1, setOption1] = useState("Click to see options");
  const [teamData1, setTeamData1] = useState({});
  const [checked, setChecked] = useState(false);
  const [teamFilterData, setTeamFilterData] = useState("");
  const [offensiveFilterData, setOffensiveFilterData] = useState("");
  const [possessionFilterData, setPossessionFilterData] = useState("");
  const [defensiveFilterData, setDefensiveFilterData] = useState("");
  const [goalkeeperFilterData, setGoalkeeperFilterData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/getTeamStats", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team: option, season: seasonOption }),
    })
      .then((response) => response.json())
      .then((json) => {
        setTeamData(json);
        // console.log(teamData);
      });
    setTeamFilterData("");
    setOffensiveFilterData("");
    setPossessionFilterData("");
    setDefensiveFilterData("");
    setGoalkeeperFilterData("");
  };

  const handleStatSubmit = async (e) => {
    e.preventDefault();
    await fetch("/getAvgStats", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team: option1 }),
    })
      .then((response) => response.json())
      .then((json) => {
        setTeamData1(json);
      });
  };

  function createTables2(caption, columns, type) {
    const cols = [];
    for (let i = 0; i < columns.length; i++) {
      cols.push(<th key={i}>{columns[i]}</th>);
    }

    const rows = [];
    if (type === "team_stats" && teamData1.team_stats?.length) {
      for (let i = 0; i < teamData1.team_stats.length; i++) {
        console.log(teamData1.team_stats[i]);
        rows.push(
          <tr key={i}>
            <td>{teamData1.team_stats[i].wins}</td>
            <td>{teamData1.team_stats[i].losses}</td>
          </tr>
        );
      }
    } else if (type === "offense" && teamData1.offensive?.length) {
      for (let i = 0; i < teamData1.offensive.length; i++) {
        rows.push(
          <tr key={i}>
            <td>{teamData1.offensive[i].goals}</td>
            <td>{teamData1.offensive[i].goals_fast_break}</td>
            <td>{teamData1.offensive[i].goals_inside_box}</td>
            <td>{teamData1.offensive[i].goals_outside_box}</td>
            <td>{teamData1.offensive[i].headed_goals}</td>
            <td>{teamData1.offensive[i].penalty_goals}</td>
            <td>{teamData1.offensive[i].freekick_goals}</td>
            <td>{teamData1.offensive[i].attempts}</td>
            <td>{teamData1.offensive[i].shots_on_target}</td>
            <td>{teamData1.offensive[i].big_chance_missed}</td>
          </tr>
        );
      }
    } else if (type === "possesion" && teamData1.possesion?.length) {
      for (let i = 0; i < teamData1.possesion.length; i++) {
        rows.push(
          <tr key={i}>
            <td>{teamData1.possesion[i].total_passes}</td>
            <td>{teamData1.possesion[i].total_crosses}</td>
            <td>{teamData1.possesion[i].total_long_balls}</td>
            <td>{teamData1.possesion[i].total_through_balls}</td>
            <td>{teamData1.possesion[i].touches}</td>
            <td>{teamData1.possesion[i].backwards_passes}</td>
            <td>{teamData1.possesion[i].corner_taken}</td>
            <td>{teamData1.possesion[i].dispossesed}</td>
            <td>{teamData1.possesion[i].total_offsides}</td>
          </tr>
        );
      }
    } else if (type === "defense" && teamData1.defensive?.length) {
      for (let i = 0; i < teamData1.defensive.length; i++) {
        rows.push(
          <tr key={i}>
            <td>{teamData1.defensive[i].goals_conceded}</td>
            <td>{teamData1.defensive[i].total_clearance}</td>
            <td>{teamData1.defensive[i].interceptions}</td>
            <td>{teamData1.defensive[i].clean_sheets}</td>
            <td>{teamData1.defensive[i].outfielder_blocks}</td>
            <td>{teamData1.defensive[i].clearance_off_line}</td>
            <td>{teamData1.defensive[i].headed_clearance}</td>
            <td>{teamData1.defensive[i].last_man_tackles}</td>
            <td>{teamData1.defensive[i].total_red_cards}</td>
            <td>{teamData1.defensive[i].total_yellow_cards}</td>
            <td>{teamData1.defensive[i].penalty_conceded}</td>
            <td>{teamData1.defensive[i].penalty_goal_conceded}</td>
            <td>{teamData1.defensive[i].own_goals}</td>
          </tr>
        );
      }
    } else if (type === "gk" && teamData1.goalkeeper?.length) {
      for (let i = 0; i < teamData1.goalkeeper.length; i++) {
        rows.push(
          <tr key={i}>
            <td>{teamData1.goalkeeper[i].saves}</td>
            <td>{teamData1.goalkeeper[i].punches}</td>
            <td>{teamData1.goalkeeper[i].total_high_claim}</td>
            <td>{teamData1.goalkeeper[i].penalty_saves}</td>
          </tr>
        );
      }
    }
    return (
      <table>
        <caption>{caption}</caption>
        <tbody>
          <tr>{cols}</tr>
          {rows}
        </tbody>
      </table>
    );
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <h1>Team Stats</h1>
      <form onSubmit={handleSubmit} style={{ paddingBottom: "3%" }}>
        <label style={{ paddingRight: "3%" }}>
          Pick a team:
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            <Option value="Click to see options" />
            <Option value="Manchester City" />
            <Option value="Manchester United" />
            <Option value="Chelsea" />
            <Option value="Liverpool" />
            <Option value="Arsenal" />
            <Option value="Tottenham Hotspur" />
          </select>
        </label>
        <label>
          Pick a season:
          <select
            value={seasonOption}
            onChange={(e) => setSeasonOption(e.target.value)}
          >
            <Option value="All seasons" />
            <Option value="2006-2007" />
            <Option value="2007-2008" />
            <Option value="2008-2009" />
            <Option value="2009-2010" />
            <Option value="2010-2011" />
            <Option value="2011-2012" />
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          Filter by season
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          <FilterOptionsDropDown
            team={option}
            table={TEAM_SEASON_TABLE}
            filterOptions={team_cols}
            dbColumns={db_team_cols}
            setFilterData={setTeamFilterData}
            type={TEAM_STATS}
            teamData={teamData}
            season={seasonOption}
          />
          {createTables(
            "Team Stats",
            team_cols,
            db_team_cols,
            TEAM_STATS,
            teamFilterData?.team_stats?.length ? teamFilterData : teamData,
            teamFilterData?.team_stats?.length
          )}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          <FilterOptionsDropDown
            team={option}
            table={OFFENSIVE_TABLE}
            filterOptions={offensive_cols}
            dbColumns={db_offensive_cols}
            setFilterData={setOffensiveFilterData}
            type={OFFENSIVE}
            season={seasonOption}
          />
          {createTables(
            "Offensive Stats",
            offensive_cols,
            db_offensive_cols,
            OFFENSIVE,
            offensiveFilterData?.offensive?.length
              ? offensiveFilterData
              : teamData,
            offensiveFilterData?.offensive?.length
          )}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          <FilterOptionsDropDown
            team={option}
            table={POSSESSION_TABLE}
            filterOptions={possesion_cols}
            dbColumns={db_possesion_cols}
            setFilterData={setPossessionFilterData}
            type={POSSESSION}
            season={seasonOption}
          />
          {createTables(
            "Possesion Stats",
            possesion_cols,
            db_possesion_cols,
            POSSESSION,
            possessionFilterData?.possesion?.length
              ? possessionFilterData
              : teamData,
            possessionFilterData?.possesion?.length
          )}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          <FilterOptionsDropDown
            team={option}
            table={DEFENSIVE_TABLE}
            filterOptions={defensive_cols}
            dbColumns={db_defensive_cols}
            setFilterData={setDefensiveFilterData}
            type={DEFENSIVE}
            season={seasonOption}
          />
          {createTables(
            "Defensive Stats",
            defensive_cols,
            db_defensive_cols,
            DEFENSIVE,
            defensiveFilterData?.defensive?.length
              ? defensiveFilterData
              : teamData,
            defensiveFilterData?.defensive?.length
          )}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          <FilterOptionsDropDown
            team={option}
            table={GOALKEEPER_TABLE}
            filterOptions={gk_cols}
            dbColumns={db_gk_cols}
            setFilterData={setGoalkeeperFilterData}
            type={GOALKEEPER}
            season={seasonOption}
          />
          {createTables(
            "Goalkeeper Stats",
            gk_cols,
            db_gk_cols,
            GOALKEEPER,
            goalkeeperFilterData?.goalkeeper?.length
              ? goalkeeperFilterData
              : teamData,
            goalkeeperFilterData?.goalkeeper?.length
          )}
        </div>
      </div>
      <h1>Average Team Stats</h1>
      <form onSubmit={handleStatSubmit} style={{ paddingBottom: "3%" }}>
        <label style={{ paddingRight: "3%" }}>
          Pick a team:
          <select value={option1} onChange={(e) => setOption1(e.target.value)}>
            <Option value="Click to see options" />
            <Option value="Manchester City" />
            <Option value="Manchester United" />
            <Option value="Chelsea" />
            <Option value="Liverpool" />
            <Option value="Arsenal" />
            <Option value="Tottenham Hotspur" />
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          {createTables2("Team Stats", team_cols1, "team_stats")}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          {createTables2("Offensive Stats", offensive_cols1, "offense")}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          {createTables2("Possesion Stats", possesion_cols1, "possesion")}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          {createTables2("Defensive Stats", defensive_cols1, "defense")}
        </div>
      </div>
      <div style={{ paddingBottom: "2%" }}>
        <div style={{ margin: "0%", display: "inline-block" }}>
          {createTables2("Goalkeeper Stats", gk_cols1, "gk")}
        </div>
      </div>
    </div>
  );
}

export default App;
