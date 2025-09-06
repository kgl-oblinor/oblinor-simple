import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          Oblinor Emisjon Platform
        </h1>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Velkommen til Oblinor</h1>
        <p className={styles.subtitle}>
          Profesjonell emisjonsplattform for norske investorer
        </p>
        <button 
          className={styles.ctaButton}
          onClick={() => navigate('/login')}
        >
          Logg inn
        </button>
      </section>

      {/* Emission Highlight */}
      <section className={styles.emissionHighlight}>
        <div className={styles.highlightContainer}>
          <h2 className={styles.highlightTitle}>Oblinor Serie B - Vekstkapital</h2>
          <span className={styles.highlightText}>🎯 Nye aksjer: 20,000</span>
          <span className={styles.highlightText}>💰 Pris per aksje: 222 NOK</span>
          <span className={styles.highlightText}>📊 Total emisjon: 4,440,000 NOK</span>
          <span className={styles.highlightText}>📅 Periode: Oktober - November 2025</span>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Platform Features
        </h2>
        <p className={styles.sectionSubtitle}>
          Alt du trenger for å administrere og delta i aksjeemisjoner
        </p>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>👥 Aksjonæroversikt</h3>
            <p className={styles.cardText}>
              Komplett oversikt over alle aksjonærer, deres eierandeler og kontaktinformasjon.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>📈 Emisjonsstyring</h3>
            <p className={styles.cardText}>
              Administrer aktive emisjoner, priser og tilgjengelige aksjer på en oversiktlig måte.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>✅ Tegningsadministrasjon</h3>
            <p className={styles.cardText}>
              Håndter tegninger fra investorer med godkjenningsworkflow og automatisk allokering.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>🔐 Sikker tilgang</h3>
            <p className={styles.cardText}>
              Rollbasert tilgang med ulike nivåer for administratorer og investorer.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>📊 Rapportering</h3>
            <p className={styles.cardText}>
              Detaljerte rapporter og oversikter over emisjonsaktivitet og investordata.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>🇳🇴 Norsk plattform</h3>
            <p className={styles.cardText}>
              Laget spesielt for norske selskaper og aksjonærer med lokal support.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.callToAction}>
        <h2 className={styles.callToActionTitle}>
          Klar for å komme i gang?
        </h2>
        <p className={styles.callToActionText}>
          Logg inn for å se dine investeringsmuligheter
        </p>
        <button 
          className={styles.ctaButton}
          onClick={() => navigate('/login')}
        >
          Logg inn på plattformen
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <h3 className={styles.footerTitle}>
          Oblinor AS
        </h3>
        <p className={styles.footerText}>
          Profesjonell emisjonsplattform for norske bedrifter
        </p>
        <p className={styles.footerSmallText}>
          © 2025 Oblinor AS. Alle rettigheter reservert.
        </p>
        <div className={styles.footerSection}>
          <p className={styles.footerSmallText}>
            Platform utviklet med sikkerhet og brukervennlighet i fokus
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;