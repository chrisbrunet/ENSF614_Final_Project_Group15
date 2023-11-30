import './App.css';
import AppState from './context/AppState';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/routes/Navigation';
import { Link } from 'react-router-dom';

function App() {
    return (
        <AppState>
            <Router>
                <div className="App">
                    <Navigation />
                </div>
            </Router>
        </AppState>
    );
}

export default App;
