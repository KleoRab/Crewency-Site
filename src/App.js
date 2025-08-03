import logo from './crewency-logo-white.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Logo" alt="Crewency" />
        <nav className="Menu">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="Icons">
          <span role="img" aria-label="search">🔍</span>
          <span role="img" aria-label="settings">⚙️</span>
          <span role="img" aria-label="notifications">🔔</span>
          <span role="img" aria-label="profile">👤</span>
        </div>
      </header>
    </div>
  );
}

export default App;
