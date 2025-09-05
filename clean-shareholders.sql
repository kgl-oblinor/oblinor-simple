-- Remove all example shareholders and keep only the real ones

-- First, delete ALL existing shareholders
DELETE FROM shareholders;

-- Reset the ID sequence to start from 1
ALTER SEQUENCE shareholders_id_seq RESTART WITH 1;

-- Now insert ONLY the real shareholders
INSERT INTO shareholders (name, email, shares_owned) VALUES
('Kristian Gjerde Løkken', 'kristianlokken@me.com', 90000),
('Cream Holding AS', 'kristianlokken@icloud.com', 11676),
('Hewa Mohammed Rasull', 'hewamohammed522@gmail.com', 10000),
('Thom & Co AS', 'ronnthom@online.no', 2500),
('Karl Steinar Nord', 'steinar@eptec.no', 2000),
('Funis AS', 'norasrm@gmail.com', 1000),
('Anders Morten Brosveet', 'anders@brosveet.com', 1000),
('Driven By Analytics AS', 'freek@drivenbyanalytics.no', 1000),
('Rajo AS', 'oddvar.bergsholm@lyse.net', 1000),
('North Sea Group AS', 'k-oddva@online.no', 1000),
('Vest Invest AS', 'erik@vestinvest.no', 667),
('Nils Steinar Dyvik Melbø', 'ns-planter@online.no', 533),
('Sanitek AS', 'post@sanitek.no', 500),
('Aleksander Sætre Holding AS', 'aleksander.saetre@gmail.com', 400),
('Concorde Invest AS', 'berheim@gmail.com', 333),
('Johannes Skjæveland', 'johannes@skjaeveland.no', 333),
('Inge Mandt Utbøen', 'inge@utboen.no', 333),
('Arne Hagen', 'arne@ito.no', 333),
('Cett AS', 'tbp@abpeiendom.no', 333),
('RM Consultants AS', 'rolfml@lyse.net', 333),
('Trifolium AS', 'erling.overland@trifolium.no', 333),
('Frogner Regnskapskontor AS', 'post@frogner-regnskap.no', 333),
('Trygve Kierulf', 'trygve@kierulf.com', 300),
('Erik Mannseth', 'erik.mannseth@gmail.com', 200),
('Isabelle Kerspern Graasvoll', 'isabelle.graasvoll@storebrand.no', 200),
('Case Aces AS', 'claushaagensen@hotmail.com', 200),
('Hostad Consulting AS', 'stian@hostad-consulting.no', 200),
('Anders Relling', 'anders.relling@gmail.com', 200),
('Vext AS', 'john@vext24.no', 200),
('Stian Alexander Petersen', 'stian@maldives.f9.co.uk', 200);

-- Verify we have exactly 30 shareholders with correct total
SELECT 
    COUNT(*) as antall_aksjonærer,
    SUM(shares_owned) as totalt_antall_aksjer,
    ROUND(SUM(shares_owned)::numeric / 127640 * 100, 2) as prosent_av_original
FROM shareholders;