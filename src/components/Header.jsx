export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="main-navbar">
      <div className="navbar-container">
        <div className="brand-group">
          <div className="brand-logo-badge">
            <span className="logo-plane">✈</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-name">AeroCol <span className="brand-accent">Airlines</span></h1>
            <p className="brand-subtitle">Red Nacional de Vuelos de Colombia</p>
          </div>
        </div>

        <div className="navbar-aux">
          <button
            type="button"
            className="btn-theme-toggle"
            onClick={onToggleDarkMode}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <span className="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
            <span className="theme-label">{darkMode ? 'Claro' : 'Oscuro'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
