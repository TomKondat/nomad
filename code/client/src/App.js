import React from "react";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";

// Routes
import Home from "./routes/Home";
import Friends from "./routes/Friends";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import EditProfile from "./routes/EditProfile";
import SignUp from "./routes/SignUp";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header></Header>
        <Container className="pt-2">
          <Routes>
            <Route index element={<Home />} />
            <Route path="friends" element={<Friends />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="editprofile" element={<EditProfile />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
