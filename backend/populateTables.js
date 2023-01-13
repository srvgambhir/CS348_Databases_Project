const { parse } = require("csv-parse");
const fs = require("fs");

let dataRows = []

function populate(dbcon){
    fs.createReadStream("./stats.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        dataRows.push(row)
        console.log(row)
        const team = row[0];
        const wins = row[1];
        const losses = row[2];
        const goals = row[3];
        const yellow_cards = row[4];
        const red_cards = row[5];
        const socring_atts = row[6];
        const on_target_atts = row[7];
        const woodwork = row[8];
        const headers = row[9];
        const pen_goals = row[10];
        const freekicks = row[11];
        const inbox_goals = row[12];
        const outbox_goals = row[13];
        const fastbreak_goals = row[14];
        const offside = row[15];
        const clean_sheets = row[16];
        const goals_conceded = row[17];
        const saves = row[18];
        const outfield_blocks = row[19];
        const interceptions = row[20];
        const tackles = row[21];
        const last_man_tackles = row[22];
        const clearances = row[23];
        const head_clearances = row[24];
        const own_goals = row[25];
        const penalties_conceded = row[26];
        const pen_goals_conceded = row[27];
        const total_passes = row[28];
        const through_balls = row[29];
        const long_balls = row[30];
        const backward_passes = row[31];
        const crosses = row[32];
        const corners = row[33];
        const touches = row[34];
        const big_chances_missed = row[35];
        const line_clearances = row[36];
        const dispossesed = row[37];
        const penalty_saves = row[38];
        const claims = row[39];
        const punches = row[40];
        const season = row[41];
        var insert_team_season = `INSERT IGNORE INTO Team_Season (team, season, wins, losses) VALUES ('${team}', '${season}', '${wins}', '${losses}')`;
        var insert_offensive = `INSERT IGNORE INTO Offensive (team, season, goals, attempts, shots_on_target, headed_goals, freekick_goals, goals_outside_box, big_chance_missed, penalty_goals, goals_inside_box, goals_fast_break) VALUES ('${team}', '${season}', '${goals}', '${socring_atts}', '${on_target_atts}', '${headers}', '${freekicks}', '${outbox_goals}', '${big_chances_missed}', '${pen_goals}', '${inbox_goals}', '${fastbreak_goals}')`;
        var insert_possession = `INSERT IGNORE INTO Possesion (team, season, total_passes, total_long_balls, total_crosses, touches, total_offsides, total_through_balls, backwards_passes, corner_taken, dispossesed) VALUES ('${team}', '${season}', '${total_passes}', '${long_balls}', '${crosses}', '${touches}', '${offside}', '${through_balls}', '${backward_passes}', '${corners}', '${dispossesed}');`;
        var insert_gk = `INSERT IGNORE INTO Goalkeeper (team, season, saves, total_high_claim, penalty_saves, punches) VALUES ('${team}', '${season}', '${saves}', '${claims}', '${penalty_saves}', '${punches}')`
        var insert_deffensive = `INSERT IGNORE INTO Defensive (team, season, total_yellow_cards, clean_sheets, outfielder_blocks, total_tackles, total_clearance, own_goals, penalty_goal_conceded, total_red_cards, goals_conceded, interceptions, last_man_tackles, headed_clearance, penalty_conceded, clearance_off_line) VALUES ('${team}', '${season}', '${yellow_cards}', '${clean_sheets}', '${outfield_blocks}', '${tackles}', '${clearances}', '${own_goals}', '${pen_goals_conceded}', '${red_cards}', '${goals_conceded}', '${interceptions}', '${last_man_tackles}', '${head_clearances}', '${penalties_conceded}', '${line_clearances}');`;

        dbcon.query(insert_team_season, function (err, result, fields) {
    		if (err) console.log(err);
        });
        dbcon.query(insert_offensive, function (err, result, fields) {
    		if (err) console.log(err);
        });
        dbcon.query(insert_possession, function (err, result, fields) {
    		if (err) console.log(err);
        });
        dbcon.query(insert_gk, function (err, result, fields) {
    		if (err) console.log(err);
        });
        dbcon.query(insert_deffensive, function (err, result, fields) {
    		if (err) console.log(err);
		});
    })
}

module.exports = { populate };

