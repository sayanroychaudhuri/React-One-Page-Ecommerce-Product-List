import './App.css';
import Home from './components/products/Home';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/about" element={<Home />}>
        </Route>
      </Routes>
        </div>
    </div>
  );
}

export default App;
