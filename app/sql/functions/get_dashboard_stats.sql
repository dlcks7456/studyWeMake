CREATE OR REPLACE FUNCTION get_dashboard_stats(user_id uuid) 
RETURNS TABLE (
    views bigint,
    month text
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) as views,
        TO_CHAR(events.created_at, 'YYYY-MM') as month
    FROM
        public.events
    JOIN public.profiles ON profiles.profile_id = user_id
    WHERE event_data ->> 'username' = profiles.username
    GROUP BY month;
END;
$$ LANGUAGE plpgsql;