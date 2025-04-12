CREATE OR REPLACE VIEW teams_profile_list_view AS
SELECT
    teams.team_id,
    teams.roles,
    teams.product_description,
    profiles.username AS username,
    profiles.avatar AS avatar
FROM public.teams
INNER JOIN profiles ON teams.team_leader_id = profiles.profile_id

SELECT * FROM teams_profile_list_view;