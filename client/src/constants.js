export const TEAM_SEASON_TABLE = "Team_Season";
export const OFFENSIVE_TABLE = "Offensive";
export const POSSESSION_TABLE = "Possesion";
export const DEFENSIVE_TABLE = "Defensive";
export const GOALKEEPER_TABLE = "Goalkeeper";

export const OFFENSIVE = "offensive";
export const DEFENSIVE = "defensive";
export const POSSESSION = "possesion";
export const GOALKEEPER = "goalkeeper";
export const TEAM_STATS = "team_stats";
export const team_cols = ["Season", "Wins", "Losses"];
export const offensive_cols = [
  "Season",
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
export const possesion_cols = [
  "Season",
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
export const defensive_cols = [
  "Season",
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
export const gk_cols = [
  "Season",
  "Saves",
  "Punches",
  "Claims",
  "Penalty saves",
];
export const db_team_cols = ["season", "wins", "losses"];

export const db_offensive_cols = [
  "season",
  "goals",
  "goals_fast_break",
  "goals_inside_box",
  "goals_outside_box",
  "headed_goals",
  "penalty_goals",
  "freekick_goals",
  "attempts",
  "shots_on_target",
  "big_chance_missed",
];
export const db_possesion_cols = [
  "season",
  "total_passes",
  "total_crosses",
  "total_long_balls",
  "total_through_balls",
  "touches",
  "backwards_passes",
  "corner_taken",
  "dispossesed",
  "total_offsides",
];

export const db_defensive_cols = [
  "season",
  "goals_conceded",
  "total_clearance",
  "interceptions",
  "clean_sheets",
  "outfielder_blocks",
  "clearance_off_line",
  "headed_clearance",
  "last_man_tackles",
  "total_red_cards",
  "total_yellow_cards",
  "penalty_conceded",
  "penalty_goal_conceded",
  "own_goals",
];

export const db_gk_cols = [
  "season",
  "saves",
  "punches",
  "total_high_claim",
  "penalty_saves",
];
export const db_all_cols = db_team_cols.concat(
  db_offensive_cols,
  db_possesion_cols,
  db_defensive_cols,
  db_gk_cols
);

export const all_cols = team_cols.concat(
  offensive_cols,
  possesion_cols,
  defensive_cols,
  gk_cols
);
export const mapClientToDb = (clientTable, dbTable) => {
  if (clientTable.length !== dbTable.length) {
    console.log("ERROR");
  }
  const mapClientToDb = new Map();
  for (let i = 0; i < clientTable.length; i++) {
    mapClientToDb.set(clientTable[i], dbTable[i]);
  }
  return mapClientToDb;
};
