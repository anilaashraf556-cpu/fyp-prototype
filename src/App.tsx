import { useEffect, useState } from "react";
import "./App.css";
import MapView from "./MapView";

const modelShelters = [
  {
    id: 1,
    name: "Eastside Community Shelter",
    address: "12 Riverside Avenue, East District",
    distance: "1.2 km",
    totalCapacity: 80,
    availableSpaces: 44,
    status: "Open",
    type: "Public Shelter",
  },
  {
    id: 2,
    name: "San Pedro School Center",
    address: "25 Central Road, San Pedro",
    distance: "2.4 km",
    totalCapacity: 60,
    availableSpaces: 31,
    status: "Open",
    type: "School Shelter",
  },
  {
    id: 3,
    name: "Riverside Medical Post",
    address: "8 Floodway Street, Riverside",
    distance: "3.0 km",
    totalCapacity: 45,
    availableSpaces: 12,
    status: "Limited",
    type: "Medical Facility",
  },
  {
    id: 4,
    name: "Barangay Health Hall",
    address: "19 Kalye Puso, Barangay Bayan",
    distance: "4.1 km",
    totalCapacity: 50,
    availableSpaces: 22,
    status: "Open",
    type: "Community Shelter",
  },
];

function App() {
  const [backendStatus, setBackendStatus] = useState("offline");
  const [backendMessage, setBackendMessage] = useState("Backend Offline");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Health endpoint unavailable");
        }
        return response.json();
      })
      .then((data) => {
        setBackendStatus("connected");
        setBackendMessage(data.message || "Backend Connected");
      })
      .catch(() => {
        setBackendStatus("offline");
        setBackendMessage("Backend Offline");
      });
  }, []);

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

            <div className="backend-status-card">
              <div className="backend-status-top">
                <span className="backend-title">Backend Connection</span>
                <span className={`backend-indicator ${backendStatus}`}></span>
              </div>
              <div className={`backend-status-text ${backendStatus}`}>
                {backendStatus === "connected" ? "Backend Connected" : "Backend Offline"}
              </div>
              <div className="backend-status-message">{backendMessage}</div>
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
              <span className="section-kicker dark-kicker">Shelter Recommendations</span>
              <h2>Recommended Flood Shelters</h2>
            </div>
            <a className="view-link" href="#">
              View all
            </a>
          </div>

          <div className="shelter-grid">
            {modelShelters.map((shelter) => (
              <article className="shelter-card" key={shelter.id}>
                <div className="shelter-card-head">
                  <span className="shelter-type">{shelter.type}</span>
                  <span className={`shelter-status ${shelter.status.toLowerCase()}`}>
                    {shelter.status}
                  </span>
                </div>
                <div className="shelter-card-body">
                  <h3>{shelter.name}</h3>
                  <div className="address-line">
                    <svg viewBox="0 0 24 24" className="mini-icon">
                      <path d="M12 2C8 2 5 5.1 5 8.7C5 13.3 12 22 12 22S19 13.3 19 8.7C19 5.1 16 2 12 2Z" />
                      <circle cx="12" cy="8.7" r="2.7" />
                    </svg>
                    <span>{shelter.address}</span>
                  </div>

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
                      Capacity {shelter.totalCapacity}
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" className="mini-icon">
                        <path d="M12 2a10 10 0 1 0 10 10" />
                        <path d="M12 8h.01M12 12l4 4" />
                      </svg>
                      {shelter.availableSpaces} spaces
                    </span>
                  </div>

                  <div className="card-footer">
                    <span className="safety-label">Safety: {shelter.status}</span>
                    <button className="details-button">View Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="map-section">
          <div className="section-heading map-heading">
            <div>
              <span className="section-kicker dark-kicker">Map & Evacuation Route</span>
              <h2>Safe Route Overview</h2>
            </div>
            <span className="map-mode">
              <span className="map-dot" aria-hidden="true" />
              Live Routing
            </span>
          </div>

          <div className="map-shell">
            <div className="map-frame">
              <div className="map-surface leaflet-surface">
                <div className="map-titlebar">
                  <span className="map-title">Faisalabad Sample Map</span>
                  <span className="map-date">OpenStreetMap</span>
                </div>
                <MapView />
              </div>
            </div>

            <aside className="route-panel">
              <div className="route-panel-head">
                <span className="route-panel-title">Evacuation Route</span>
                <span className="route-distance">1.2 km</span>
              </div>

              <div className="route-route">
                <div className="route-step">
                  <span className="route-step-dot route-dot-start" />
                  <div>
                    <span className="route-label">Start</span>
                    <span className="route-value">San Pedro</span>
                  </div>
                </div>
                <div className="route-step">
                  <span className="route-step-line" />
                </div>
                <div className="route-step">
                  <span className="route-step-dot route-dot-shelter" />
                  <div>
                    <span className="route-label">Destination</span>
                    <span className="route-value">Eastside Community Shelter</span>
                  </div>
                </div>
              </div>

              <div className="route-stats">
                <div>
                  <span className="route-stat-label">Travel Time</span>
                  <span className="route-stat-value">08 min</span>
                </div>
                <div>
                  <span className="route-stat-label">Risk Level</span>
                  <span className="route-stat-value high-risk">High</span>
                </div>
              </div>

              <button className="route-button">Start Route</button>
            </aside>
          </div>
        </section>

        <section className="emergency-section">
          <div className="section-heading emergency-heading">
            <div>
              <span className="section-kicker dark-kicker">Emergency Information</span>
              <h2>Flood Safety Instructions</h2>
            </div>
            <span className="alert-banner">
              <span className="alert-banner-dot" aria-hidden="true" />
              Flood Warning Active
            </span>
          </div>

          <div className="emergency-grid">
            <article className="emergency-card">
              <div className="emergency-card-head">
                <span className="emergency-icon">!</span>
                <span className="emergency-title">What to Do During a Flood</span>
              </div>
              <ul className="emergency-list">
                <li>Move to higher ground immediately.</li>
                <li>Follow official evacuation alerts.</li>
                <li>Keep your emergency pack nearby.</li>
                <li>Use safe routes and avoid flooded roads.</li>
              </ul>
            </article>

            <article className="emergency-card danger-card">
              <div className="emergency-card-head">
                <span className="emergency-icon">×</span>
                <span className="emergency-title">Things to Avoid</span>
              </div>
              <ul className="emergency-list">
                <li>Do not walk through fast-moving water.</li>
                <li>Avoid flooded power lines and damaged wires.</li>
                <li>Do not return home until officials declare it safe.</li>
                <li>Do not drink flood water or use it for cooking.</li>
              </ul>
            </article>

            <article className="emergency-card">
              <div className="emergency-card-head">
                <span className="emergency-icon">✓</span>
                <span className="emergency-title">Preparation Checklist</span>
              </div>
              <ul className="emergency-list">
                <li>Pack water, medicines, and flashlights.</li>
                <li>Charge phones and emergency lights.</li>
                <li>Save shelter and family contact information.</li>
                <li>Prepare a small emergency bag.</li>
              </ul>
            </article>
          </div>

          <div className="contacts-section">
            <div className="contacts-panel">
              <div className="contacts-heading">
                <span className="contacts-title">Emergency Contact Information</span>
              </div>
              <div className="contact-list">
                <div className="contact-row">
                  <span className="contact-label">National Emergency</span>
                  <span className="contact-value">911</span>
                </div>
                <div className="contact-row">
                  <span className="contact-label">Flood Response Hotline</span>
                  <span className="contact-value">+1 (800) 555-0147</span>
                </div>
                <div className="contact-row">
                  <span className="contact-label">Local Rescue Team</span>
                  <span className="contact-value">San Pedro Command</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
