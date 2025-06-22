CREATE OR REPLACE FUNCTION public.get_product_stats(product_id uuid)
RETURNS TABLE (
    product_views bigint,
    product_visits bigint,
    month text
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        SUM(CASE WHEN event_type = 'product_view' THEN 1 ELSE 0 END) AS product_views,
        SUM(CASE WHEN event_type = 'product_visit' THEN 1 ELSE 0 END) AS product_visits,
        to_char(events.created_at, 'YYYY-MM') as month
        FROM public.events
        WHERE event_data ->> 'product_id' = product_id
        GROUP BY month;
END;
$$ LANGUAGE plpgsql;