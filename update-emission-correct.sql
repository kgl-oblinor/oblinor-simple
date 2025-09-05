-- Update emission with correct dates and specifications

UPDATE emissions SET
    new_shares_offered = 20000,
    price_per_share = 222.00,
    start_date = '2025-10-01',
    end_date = '2025-11-30'  -- End date must be after start date
WHERE id = 1;

-- Verify the update
SELECT 
    title,
    shares_before,
    new_shares_offered,
    shares_after,
    price_per_share,
    ROUND((new_shares_offered::numeric / shares_after * 100), 2) as dilution_percent,
    (new_shares_offered * price_per_share) as total_raise_nok,
    TO_CHAR((new_shares_offered * price_per_share), 'FM999,999,999') as formatted_raise,
    start_date,
    end_date,
    status
FROM emissions WHERE id = 1;