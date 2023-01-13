/* Feature: Filter by Team 
   Example using team Manchester United:
*/

SELECT * FROM Team_Season
     JOIN    Offensive ON Team_Season.team = Offensive.team && Team_Season.season = Offensive.season
     JOIN    Defensive ON Team_Season.team = Defensive.team && Team_Season.season = Defensive.season
     JOIN    Possesion ON Team_Season.team = Possesion.team && Team_Season.season = Possesion.season
     JOIN    Goalkeeper ON Team_Season.team = Goalkeeper.team && Team_Season.season = Goalkeeper.season
WHERE Team_Season.team = "Manchester United";



/* Feature: Filter by Team and Season 
   Example using Arsenal in the 2008-2009 season:
*/

SELECT * FROM Team_Season
     JOIN    Offensive ON Team_Season.team = Offensive.team && Team_Season.season = Offensive.season
     JOIN    Defensive ON Team_Season.team = Defensive.team && Team_Season.season = Defensive.season
     JOIN    Possesion ON Team_Season.team = Possesion.team && Team_Season.season = Possesion.season
     JOIN    Goalkeeper ON Team_Season.team = Goalkeeper.team && Team_Season.season = Goalkeeper.season
WHERE Team_Season.season = "2008-2009" AND Team_Season.team = "Arsenal";



/* Feature: Filter by Stat Type
   Example using goals scored by Chelsea (2006-2007 and all seasons)
*/

SELECT goals FROM Offensive WHERE team = "Chelsea" && season = "2006-2007";
SELECT goals FROM Offensive WHERE team = "Chelsea";



/* Feature: Filter Season 
   Example using 2006-2007 season:
*/

SELECT * FROM Team_Season
     JOIN    Offensive ON Team_Season.team = Offensive.team && Team_Season.season = Offensive.season
     JOIN    Defensive ON Team_Season.team = Defensive.team && Team_Season.season = Defensive.season
     JOIN    Possesion ON Team_Season.team = Possesion.team && Team_Season.season = Possesion.season
     JOIN    Goalkeeper ON Team_Season.team = Goalkeeper.team && Team_Season.season = Goalkeeper.season
WHERE Team_Season.season = "2006-2007";



/* Feature: Aggregated Stats for each team, across all seasons 
   Example using team Manchester United:
*/

SELECT AVG(wins),                /* Team _Season */
    AVG(losses), 
    AVG(goals), 			     /* Offensive */ 
    AVG(shots_on_target), 
    AVG(headed_goals),
    AVG(freekick_goals),
    AVG(goals_outside_box),
    AVG(big_chance_missed),
    AVG(attempts),
    AVG(penalty_goals),
    AVG(goals_inside_box),
    AVG(goals_fast_break),
	AVG(total_passes),	         /* Passing */
	AVG(total_long_balls),
	AVG(total_crosses),
	AVG(touches),
    AVG(total_offsides),
  	AVG(total_through_balls),
	AVG(backwards_passes),
	AVG(corner_taken),
	AVG(dispossesed),
	AVG(total_yellow_cards),          /* Defensive */
	AVG(clean_sheets),
	AVG(outfielder_blocks),
	AVG(total_tackles),
	AVG(total_clearance),
	AVG(own_goals),
	AVG(penalty_goal_conceded),
	AVG(total_red_cards),
	AVG(goals_conceded),
	AVG(interceptions),
	AVG(last_man_tackles),
	AVG(headed_clearance),
	AVG(penalty_conceded),
	AVG(clearance_off_line),
	AVG(saves),                       /* Goalkeeper */
	AVG(total_high_claim),
	AVG(penalty_saves),
	AVG(punches)                   
FROM Team_Season
     JOIN    Offensive ON Team_Season.team = Offensive.team && Team_Season.season = Offensive.season
     JOIN    Defensive ON Team_Season.team = Defensive.team && Team_Season.season = Defensive.season
     JOIN    Possesion ON Team_Season.team = Possesion.team && Team_Season.season = Possesion.season
     JOIN    Goalkeeper ON Team_Season.team = Goalkeeper.team && Team_Season.season = Goalkeeper.season
GROUP BY Team_Season.team
HAVING Team_Season.team = "Manchester United";



/* Feature: Order By (show teams in specified season in ascending/descending order based on a property)
   Example using goals property in 2006-2007 season, in ascending order
*/

SELECT * FROM Team_Season
     JOIN    Offensive ON Team_Season.team = Offensive.team && Team_Season.season = Offensive.season
     JOIN    Defensive ON Team_Season.team = Defensive.team && Team_Season.season = Defensive.season
     JOIN    Possesion ON Team_Season.team = Possesion.team && Team_Season.season = Possesion.season
     JOIN    Goalkeeper ON Team_Season.team = Goalkeeper.team && Team_Season.season = Goalkeeper.season
WHERE Team_Season.season = "2006-2007"
ORDER BY goals ASC;

