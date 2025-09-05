-- Update emission with real Oblinor data

UPDATE emissions SET
    title = 'Oblinor Serie B - Vekstkapital',
    description = 'Oblinor AS henter frisk kapital for å akselerere vekst og produktutvikling. Midlene skal brukes til å videreutvikle plattformen, ansette nøkkelpersonell, og ekspandere til nye markeder i Skandinavia. Målsetning om 10x vekst innen 2026.',
    presentation_material = 'https://oblinor.no/investor/serie-b-presentasjon.pdf',
    shares_before = 127640,  -- Nåværende antall aksjer
    new_shares_offered = 22360,  -- Ny emisjon på ~17.5% dilution
    price_per_share = 45.00,  -- NOK per aksje (høyere verdsetting)
    start_date = '2025-01-10',
    end_date = '2025-02-28',
    status = 'ACTIVE'
WHERE id = 1;

-- Verify the update
SELECT 
    title,
    description,
    shares_before,
    new_shares_offered,
    shares_after,
    price_per_share,
    ROUND((new_shares_offered::numeric / shares_after * 100), 2) as dilution_percent,
    (new_shares_offered * price_per_share) as total_raise_nok,
    start_date,
    end_date,
    status
FROM emissions WHERE id = 1;