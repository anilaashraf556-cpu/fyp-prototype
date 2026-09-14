import "./App.css";

const shelters = [
  {
    name: "Eastside Community Shelter",
    type: "Public Shelter",
    distance: "1.2 km",
    capacity: "36 / 50",
    status: "Open",
  },
  {
    name: "San Pedro School Center",
    type: "School Shelter",
    distance: "2.4 km",
    capacity: "18 / 40",
    status: "Open",
  },
  {
    name: "Riverside Medical Post",
    type: "Medical Facility",
    distance: "3.0 km",
    capacity: "12 / 30",
    status: "Limited",
  },
];

function App() {
  return (
    <div className="flood-app">
      <nav className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="brand-svg">
              <path d="M3 15C5.8 10.7 8.2 9.8 10 13C12 8.8 14.1 7.8 16 12C18.2 8 21 9 21 12C20 14 18 16 15 14C13 15.3 10.9 14.7 9.4 11.8C8.2 12.2 6.2 13.7 3 15Z" />
            </svg>
          </span>
          <span className="brand-text">FloodSafe</span>
        </a>

        <div className="main-nav">
          <a className="nav-link active" href="#">
            Dashboard
          </a>
          <a className="nav-link" href="#">
            Shelters
          </a>
          <a className="nav-link" href="#">
            Alerts
          </a>
          <a className="nav-link" href="#">
            Reports
          </a>
        </div>

        <button className="emergency-button">
          <span className="emergency-dot" aria-hidden="true" />
          Emergency
        </button>
      </nav>

      <main className="dashboard">
        <section className="hero-layout">
          <section className="hero-content">
            <div className="section-kicker">Flood Response Center</div>
            <h1>Find a Safe Shelter During a Flood</h1>
            <p className="hero-description">
              Check current flood conditions and quickly discover the nearest
              safe shelter for your location.
            </p>

            <div className="search-panel">
              <div className="location-field">
                <label htmlFor="location" className="field-label">
                  Location
                </label>
                <div className="input-wrap">
                  <span className="location-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="icon-svg">
                      <path d="M12 2C8 2 5 5.1 5 8.7C5 13.3 12 22 12 22S19 13.3 19 8.7C19 5.1 16 2 12 2Z" />
                      <circle cx="12" cy="8.7" r="2.7" />
                    </svg>
                  </span>
                  <input
                    id="location"
                    className="location-input"
                    type="text"
                    placeholder="Enter your area"
                    value="Barangay San Pedro"
                    readOnly
                  />
                </div>
              </div>

              <button className="find-button">
                <span>Find Safe Shelter</span>
                <svg viewBox="0 0 24 24" className="button-arrow">
                  <path d="M5 12h14M13 3l9 9-9 9" />
                </svg>
              </button>
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-value">08</span>
                <span className="stat-label">Shelters Open</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">24</span>
                <span className="stat-label">Evacuation Teams</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">14m</span>
                <span className="stat-label">Avg. Response</span>
              </div>
            </div>
          </section>

          <aside className="risk-card">
            <div className="risk-card-head">
              <span className="risk-title">Flood Risk Status</span>
              <span className="risk-badge">
                <svg viewBox="0 0 24 24" className="alert-icon">
                  <path d="M12 3L2 21h20z" />
                  <path d="M12 9h.01M12 14l.01 0" />
                </svg>
              </span>
            </div>

            <div className="risk-status-block">
              <span className="risk-status">High Risk</span>
              <span className="risk-update">Updated 08:45 AM</span>
            </div>

            <div className="risk-bars" aria-label="Risk level">
              <span className="risk-bar risk-bar-one" />
              <span className="risk-bar risk-bar-two" />
              <span className="risk-bar risk-bar-three" />
              <span className="risk-bar risk-bar-four" />
            </div>

            <div className="risk-details">
              <div className="risk-detail">
                <span className="detail-label">Water Level</span>
                <span className="detail-value">2.6 m</span>
              </div>
              <div className="risk-detail">
                <span className="detail-label">Affected Area</span>
                <span className="detail-value">Zone A-12</span>
              </div>
              <div className="risk-detail">
                <span className="detail-label">Evacuation</span>
                <span className="detail-value">Required</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="shelter-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker dark-kicker">Recommended Shelters</span>
              <h2>Nearby Safe Places</h2>
            </div>
            <a className="view-link" href="#">
              View all
            </a>
          </div>

          <div className="shelter-grid">
            {shelters.map((shelter) => (
              <article className="shelter-card" key={shelter.name}>
                <div className="shelter-card-head">
                  <span className="shelter-type">{shelter.type}</span>
                  <span className={`shelter-status ${shelter.status.toLowerCase()}`}>
                    {shelter.status}
                  </span>
                </div>
                <div className="shelter-card-body">
                  <h3>{shelter.name}</h3>
                  <div className="shelter-meta">
                    <span>
                      <svg viewBox="0 0 24 24" className="mini-icon">
                        <path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      </svg>
                      {shelter.distance}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" className="mini-icon">
                        <path d="M5 5h14v14H5z" />
                      </svg>
                      {shelter.capacity}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
