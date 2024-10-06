import Weather from './components/Weather';
import './App.css';
import { ThemeProvider } from './components/Context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
    <div className="App">
      <Weather/>
    </div>
    </ThemeProvider>
  );
}

export default App;
