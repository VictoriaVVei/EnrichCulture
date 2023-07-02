import React from 'react'; //import React Component
import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from './src/pages/MainPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="main" />} />
        <Route path="*" element={<Navigate to="main" />} />
        <Route path="main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
