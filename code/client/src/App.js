import React from "react";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";

// Routes
import Home from "./routes/Home";
import Friends from "./routes/Friends";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import EditProfile from "./routes/EditProfile";
import SignUp from "./routes/SignUp";
import ConventionPage from "./routes/Convention";
import EditConvention from "./routes/EditConvention";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Container className="pt-2">
            <Routes>
              <Route index element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route path="friends" element={<Friends />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="conventionpage" element={<ConventionPage />} />
              <Route path="editconvention" element={<EditConvention />} />
            </Routes>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
