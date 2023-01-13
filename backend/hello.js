const fs = require("fs");
//const fastcsv = require("fast-csv");
var mysql = require("mysql");
var readline = require("readline");
const express = require("express");
var bodyParser = require("body-parser");

//import {populate} from "./populateTables.js";
const populate = require("./populateTables");
const { allowedNodeEnvironmentFlags } = require("process");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "soccerDB",
});

var delTables = readline.createInterface({
  input: fs.createReadStream("./deletetables.sql"),
  terminal: false,
});

delTables.on("line", function (chunk) {
  if (chunk.length !== 0) {
    console.log(chunk);
    con.query(chunk.toString("ascii"), function (err, result, fields) {
      if (err) console.log(err);
    });
  }
});

function createTables() {
  var rl = readline.createInterface({
    input: fs.createReadStream("./createtables.sql"),
    terminal: false,
  });

  rl.on("line", function (chunk) {
    if (chunk.length !== 0) {
      con.query(chunk.toString("ascii"), function (err, result, fields) {
        if (err) console.log(err);
      });
    }
  });
}

console.log("create");
createTables();

function pop_db() {
  populate.populate(con);
}

setTimeout(pop_db, 1000);

//wait to populate data before starting server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var response = {};

function executeQuery(query, key) {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        response[key] = result;
        resolve({ result, fields });
      }
    });
  });
}

app.post("/getTeamStats", async (req, res) => {
  const team = req.body.team;
  const season = req.body.season;
  console.log(req.body.season);
  try {
    if (season == "Click to see options" || season == "All seasons") {
      const { result_team, fields } = await executeQuery(
        `SELECT * FROM Team_Season WHERE team='${team}';`,
        "team_stats"
      );
      const { result_offensive, fields_offensive } = await executeQuery(
        `SELECT * FROM Offensive WHERE team='${team}';`,
        "offensive"
      );
      const { result_possesion, fields_possesion } = await executeQuery(
        `SELECT * FROM Possesion WHERE team='${team}';`,
        "possesion"
      );
      const { result_defensive, fields_defensive } = await executeQuery(
        `SELECT * FROM Defensive WHERE team='${team}';`,
        "defensive"
      );
      const { result_goalkeeper, fields_goalkeeper } = await executeQuery(
        `SELECT * FROM Goalkeeper WHERE team='${team}';`,
        "goalkeeper"
      );
    } else {
      const { result_team, fields } = await executeQuery(
        `SELECT * FROM Team_Season WHERE team ='${team}' AND season = '${season}';`,
        "team_stats"
      );
      const { result_offensive, fields_offensive } = await executeQuery(
        `SELECT * FROM Offensive WHERE team ='${team}' AND season ='${season}';`,
        "offensive"
      );
      const { result_possesion, fields_possesion } = await executeQuery(
        `SELECT * FROM Possesion WHERE team ='${team}' AND season ='${season}';`,
        "possesion"
      );
      const { result_defensive, fields_defensive } = await executeQuery(
        `SELECT * FROM Defensive WHERE team ='${team}' AND season ='${season}';`,
        "defensive"
      );
      const { result_goalkeeper, fields_goalkeeper } = await executeQuery(
        `SELECT * FROM Goalkeeper WHERE team ='${team}' AND season ='${season}';`,
        "goalkeeper"
      );
    }

    res.send(JSON.stringify(response));
  } catch (err) {
    throw err;
  }
});

app.post("/filterByStat", async (req, res) => {
  const { team, table, filter, type, season } = req.body;
  console.log("filter", filter);
  if (season == "Click to see options" || season == "All seasons") {
    const { result_team, fields } = await executeQuery(
      `SELECT ${filter} FROM ${table} WHERE team='${team}';`,
      type
    );
  } else {
    const { result_team, fields } = await executeQuery(
      `SELECT ${filter} FROM ${table} WHERE team='${team}' AND season ='${season}';`,
      type
    );
  }
  console.log("response", type);
  res.send(JSON.stringify(response));
});

app.post("/filterBySeason", async (req, res) => {
  const { season, sortBy, sortDirection } = req.body;
  console.log("season", season);
  const { result_team, fields } = await executeQuery(
    `SELECT * FROM Team_Season
     JOIN    Offensive ON Team_Season.team = Offensive.team && Team_Season.season =       Offensive.season
     JOIN    Defensive ON Team_Season.team = Defensive.team && Team_Season.season = Defensive.season
     JOIN    Possesion ON Team_Season.team = Possesion.team && Team_Season.season = Possesion.season
     JOIN    Goalkeeper ON Team_Season.team = Goalkeeper.team && Team_Season.season = Goalkeeper.season
WHERE Team_Season.season = '${season}'
` +
      (sortBy === "Default"
        ? ";"
        : `ORDER BY ${sortBy} ${sortDirection};
 `),
    "team_stats"
  );
  res.send(JSON.stringify(response));
});

app.get("/", (req, res) => {
  con.query(
    "SELECT COUNT(*) FROM Team_Season;",
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({ message: result });
    }
  );
});

app.post("/getAvgStats", async (req, res) => {
  const team = req.body.team;
  console.log(req.body.team);
  try {
    const { result_team, fields } = await executeQuery(
      `SELECT AVG(wins) AS 'wins', AVG(losses) AS 'losses' FROM Team_Season WHERE team='${team}';`,
      "team_stats"
    );
    const { result_offensive, fields_offensive } = await executeQuery(
      `SELECT AVG(goals) AS 'goals', AVG(shots_on_target) AS 'shots_on_target', AVG(headed_goals) AS 'headed_goals', AVG(freekick_goals) AS 'freekick_goals', AVG(goals_outside_box) AS 'goals_outside_box', AVG(big_chance_missed) AS 'big_chance_missed', AVG(attempts) AS 'attempts', AVG(penalty_goals) AS 'penalty_goals', AVG(goals_inside_box) AS 'goals_inside_box', AVG(goals_fast_break) AS 'goals_fast_break' FROM Offensive WHERE team='${team}';`,
      "offensive"
    );
    const { result_possesion, fields_possesion } = await executeQuery(
      `SELECT AVG(total_passes) AS 'total_passes', AVG(total_long_balls) AS 'total_long_balls', AVG(total_crosses) AS 'total_crosses', AVG(touches) AS 'touches', AVG(total_offsides) AS 'total_offsides', AVG(total_through_balls) AS 'total_through_balls', AVG(backwards_passes) AS 'backwards_passes', AVG(corner_taken) AS 'corner_taken', AVG(dispossesed) AS 'dispossesed' FROM Possesion WHERE team='${team}';`,
      "possesion"
    );
    const { result_defensive, fields_defensive } = await executeQuery(
      `SELECT AVG(total_yellow_cards) AS 'total_yellow_cards', AVG(clean_sheets) AS 'clean_sheets', AVG(outfielder_blocks) AS 'outfielder_blocks', AVG(total_tackles) AS 'total_tackles', AVG(total_clearance) AS 'total_clearance', AVG(own_goals) AS 'own_goals', AVG(penalty_goal_conceded) AS 'penalty_goal_conceded', AVG(total_red_cards) AS 'total_red_cards', AVG(goals_conceded) AS 'goals_conceded', AVG(interceptions) AS 'interceptions', AVG(last_man_tackles) AS 'last_man_tackles', AVG(headed_clearance) AS 'headed_clearance', AVG(penalty_conceded) AS 'penalty_conceded', AVG(clearance_off_line) AS 'clearance_off_line' FROM Defensive WHERE team='${team}';`,
      "defensive"
    );
    const { result_goalkeeper, fields_goalkeeper } = await executeQuery(
      `SELECT AVG(saves) AS 'saves', AVG(total_high_claim) AS 'total_high_claim', AVG(penalty_saves) AS 'penalty_saves', AVG(punches) AS 'punches' FROM Goalkeeper WHERE team='${team}';`,
      "goalkeeper"
    );

    console.log(response);
    res.send(JSON.stringify(response));
  } catch (err) {
    throw err;
  }
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
