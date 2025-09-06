import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#fcfbfa',
    color: '#123543',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: window.innerWidth <= 768 ? '15px 20px' : '20px 40px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '20px' : '24px',
    fontWeight: 'bold',
    margin: 0,
  };

  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: window.innerWidth <= 768 ? '60px 20px' : '80px 40px',
    backgroundColor: '#fcfbfa',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '32px' : '48px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
    color: '#123543',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '18px' : '24px',
    margin: '0 0 40px 0',
    color: '#123543',
    opacity: 0.8,
  };

  const ctaButtonStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
    border: 'none',
    padding: window.innerWidth <= 768 ? '16px 32px' : '20px 40px',
    fontSize: window.innerWidth <= 768 ? '16px' : '18px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '44px',
  };

  const emissionHighlightStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: window.innerWidth <= 768 ? '40px 20px' : '60px 40px',
    textAlign: 'center',
  };

  const highlightContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const highlightTitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '24px' : '32px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
  };

  const highlightTextStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '16px' : '18px',
    margin: '5px 0',
    backgroundColor: 'rgba(252, 251, 250, 0.1)',
    padding: '10px 20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '300px',
  };

  const sectionStyle: React.CSSProperties = {
    padding: window.innerWidth <= 768 ? '60px 20px' : '80px 40px',
    textAlign: 'center',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '28px' : '36px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    color: '#123543',
  };

  const sectionSubtitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '16px' : '18px',
    margin: '0 0 50px 0',
    color: '#123543',
    opacity: 0.8,
  };

  const cardContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'left',
    transition: 'transform 0.3s ease',
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '18px' : '20px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
  };

  const cardTextStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
    lineHeight: '1.6',
    margin: 0,
    opacity: 0.9,
  };

  const callToActionStyle: React.CSSProperties = {
    backgroundColor: '#123543',
    color: '#fcfbfa',
    padding: window.innerWidth <= 768 ? '60px 20px' : '80px 40px',
    textAlign: 'center',
  };

  const callToActionTitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '28px' : '36px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
  };

  const callToActionTextStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '16px' : '18px',
    margin: '0 0 40px 0',
    opacity: 0.9,
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: '#fcfbfa',
    color: '#123543',
    padding: window.innerWidth <= 768 ? '40px 20px' : '60px 40px',
    textAlign: 'center',
    borderTop: '2px solid #123543',
  };

  const footerTitleStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '20px' : '24px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '14px' : '16px',
    margin: '0 0 10px 0',
    opacity: 0.8,
  };

  const footerSmallTextStyle: React.CSSProperties = {
    fontSize: window.innerWidth <= 768 ? '12px' : '14px',
    margin: '0 0 10px 0',
    opacity: 0.6,
  };

  const footerSectionStyle: React.CSSProperties = {
    marginTop: '20px',
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>
          Oblinor Emisjon Platform
        </h1>
      </header>

      {/* Hero Section */}
      <section style={heroStyle}>
        <h1 style={titleStyle}>Velkommen til Oblinor</h1>
        <p style={subtitleStyle}>
          Profesjonell emisjonsplattform for norske investorer
        </p>
        <button 
          style={ctaButtonStyle}
          onClick={() => navigate('/login')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(18, 53, 67, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#123543';
          }}
        >
          Logg inn
        </button>
      </section>

      {/* Emission Highlight */}
      <section style={emissionHighlightStyle}>
        <div style={highlightContainerStyle}>
          <h2 style={highlightTitleStyle}>Oblinor Serie B - Vekstkapital</h2>
          <span style={highlightTextStyle}>🎯 Nye aksjer: 20,000</span>
          <span style={highlightTextStyle}>💰 Pris per aksje: 222 NOK</span>
          <span style={highlightTextStyle}>📊 Total emisjon: 4,440,000 NOK</span>
          <span style={highlightTextStyle}>📅 Periode: Oktober - November 2025</span>
        </div>
      </section>

      {/* Features Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          Platform Features
        </h2>
        <p style={sectionSubtitleStyle}>
          Alt du trenger for å administrere og delta i aksjeemisjoner
        </p>

        <div style={cardContainerStyle}>
          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={cardTitleStyle}>👥 Aksjonæroversikt</h3>
            <p style={cardTextStyle}>
              Komplett oversikt over alle aksjonærer, deres eierandeler og kontaktinformasjon.
            </p>
          </div>

          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={cardTitleStyle}>📈 Emisjonsstyring</h3>
            <p style={cardTextStyle}>
              Administrer aktive emisjoner, priser og tilgjengelige aksjer på en oversiktlig måte.
            </p>
          </div>

          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={cardTitleStyle}>✅ Tegningsadministrasjon</h3>
            <p style={cardTextStyle}>
              Håndter tegninger fra investorer med godkjenningsworkflow og automatisk allokering.
            </p>
          </div>

          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={cardTitleStyle}>🔐 Sikker tilgang</h3>
            <p style={cardTextStyle}>
              Rollbasert tilgang med ulike nivåer for administratorer og investorer.
            </p>
          </div>

          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={cardTitleStyle}>📊 Rapportering</h3>
            <p style={cardTextStyle}>
              Detaljerte rapporter og oversikter over emisjonsaktivitet og investordata.
            </p>
          </div>

          <div 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={cardTitleStyle}>🇳🇴 Norsk plattform</h3>
            <p style={cardTextStyle}>
              Laget spesielt for norske selskaper og aksjonærer med lokal support.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={callToActionStyle}>
        <h2 style={callToActionTitleStyle}>
          Klar for å komme i gang?
        </h2>
        <p style={callToActionTextStyle}>
          Logg inn for å se dine investeringsmuligheter
        </p>
        <button 
          style={ctaButtonStyle}
          onClick={() => navigate('/login')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(252, 251, 250, 0.9)';
            e.currentTarget.style.color = '#123543';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fcfbfa';
            e.currentTarget.style.color = '#123543';
          }}
        >
          Logg inn på plattformen
        </button>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <h3 style={footerTitleStyle}>
          Oblinor AS
        </h3>
        <p style={footerTextStyle}>
          Profesjonell emisjonsplattform for norske bedrifter
        </p>
        <p style={footerSmallTextStyle}>
          © 2025 Oblinor AS. Alle rettigheter reservert.
        </p>
        <div style={footerSectionStyle}>
          <p style={footerSmallTextStyle}>
            Platform utviklet med sikkerhet og brukervennlighet i fokus
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;