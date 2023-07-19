import React from 'react'; //import React Component
import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from './src/pages/MainPage';
import { Signup } from './src/pages/Signup';
import { Signin } from './src/pages/Signin';
import { Account } from './src/pages/Account';
import { MakePost } from './src/pages/MakePost';
import { ReviseAccount } from './src/pages/ReviseAccount';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="main" />} />
        <Route path="*" element={<Navigate to="main" />} />
        <Route path="main" element={<MainPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="account" element={<Account />} />
        <Route path="makePost" element={<MakePost />} />
        <Route path="reviseAccount" element={<ReviseAccount />} />
      </Routes>
    </div>
  );
}

export default App;
