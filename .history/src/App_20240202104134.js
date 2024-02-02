import './App.css';
import Home from './components/products/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='container'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
