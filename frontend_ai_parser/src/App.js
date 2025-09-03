import Hero from './components/Hero'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      
    </div>
  );
}

export default App;
