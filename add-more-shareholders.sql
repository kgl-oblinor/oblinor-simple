-- Add more Norwegian shareholders to the database

INSERT INTO shareholders (name, email, shares_owned) VALUES
-- Existing major shareholders getting more shares
('Lars Petter Sørvåg', 'lars.petter@norvest.no', 3500),
('Anette Kristiansen', 'anette@bergenkapital.no', 2800),
('Magnus Thorsen', 'magnus@nordiskinvest.no', 2200),

-- New institutional investors
('DNB Ventures AS', 'invest@dnbventures.no', 5000),
('Sparebank 1 SR-Bank', 'kapital@sr-bank.no', 4500),
('Argentum Fondsinvesteringer AS', 'post@argentum.no', 4000),
('Investinor AS', 'post@investinor.no', 3800),
('Alliance Venture AS', 'post@allianceventure.no', 3500),
('Sarsia Seed AS', 'invest@sarsiaseed.no', 3200),
('Katapult Ocean AS', 'invest@katapultocean.com', 3000),

-- Family offices and wealth funds
('Reitan Kapital AS', 'invest@reitankapital.no', 2800),
('Canica AS', 'post@canica.no', 2500),
('Ferd AS', 'invest@ferd.no', 2400),
('Strawberry Capital AS', 'invest@strawberrycapital.no', 2200),
('Awilhelmsen AS', 'invest@awilhelmsen.no', 2000),

-- Successful entrepreneurs and angels
('Øystein Stray Spetalen', 'oystein@ferncliff.no', 1800),
('Kjell Inge Røkke', 'post@aker.no', 1700),
('John Fredriksen', 'john@frontline.no', 1600),
('Torstein Tvenge', 'torstein@tvengeinvest.no', 1500),
('Nicolai Prydz', 'nicolai@prydzcapital.no', 1400),

-- Tech entrepreneurs
('Simen Svendsen (Pexip founder)', 'simen@techventures.no', 1300),
('Åsmund Furuseth (Kahoot founder)', 'asmund@northzone.no', 1200),
('Even Heggernes (Airthings founder)', 'even@airthings.com', 1100),
('Krister Aanesen (Norselab)', 'krister@norselab.com', 1000),
('Sverre Munck', 'sverre@schibsted.no', 950),

-- Regional investors
('Trond Mohn (Bergen)', 'trond@mohnfoundation.no', 900),
('Arthur Buchardt (Stavanger)', 'arthur@buchardt.no', 850),
('Kari Stenersen (Trondheim)', 'kari@stenersencapital.no', 800),
('Per Axel Koch (Tromsø)', 'per@kochcapital.no', 750),
('Elisabeth Grieg (Bergen)', 'elisabeth@grieg.no', 700),

-- Younger generation investors
('Caroline Wang Gierløff', 'caroline@skagerak.vc', 650),
('Herman Sjøberg', 'herman@antler.no', 600),
('Maja Adriaensen', 'maja@startuplab.no', 550),
('Andreas Thorsheim', 'andreas@iterate.no', 500),
('Camilla Bjørn', 'camilla@bjornventures.no', 450),

-- Industry veterans
('Jan Haudemann-Andersen', 'jan@datum.no', 400),
('Morten Lundal', 'morten@lundal.no', 350),
('Birgitte Heskestad', 'birgitte@heskestad.no', 300),
('Geir Førre', 'geir@energyventures.no', 250),
('Anne Lise Meyer', 'annelise@meyercapital.no', 200),

-- Small investors
('Thomas Walle', 'thomas.walle@gmail.com', 150),
('Nina Jørgensen', 'nina.jorgensen@outlook.no', 100),
('Erik Sandvik', 'erik@sandvikholding.no', 100),
('Lise Fredriksen', 'lise.fredriksen@gmail.com', 75),
('Petter Nilsen', 'petter.nilsen@hotmail.no', 50);

-- Verify the total
SELECT COUNT(*) as total_shareholders, SUM(shares_owned) as total_shares FROM shareholders;