import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DJInterface from "./components/DJ/DJInterface";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DJInterface />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
