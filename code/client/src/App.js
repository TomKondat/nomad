import React from "react";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";

// Routes
import Home from "./routes/Home";
import FriendsPage from "./routes/Friends";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import EditProfile from "./routes/EditProfile";
import SignUp from "./routes/SignUp";
import ConventionPage from "./routes/Convention";
import EditConvention from "./routes/EditConvention";
import ChatPage from "./routes/ChatPage";
import NewConvention from "./routes/NewConvention";
import AddConvention from "./routes/AddConvention";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Header></Header>
          <Container className="pt-2">
            <Routes>
              <Route index element={<Home />} />
              <Route path="friendspage" element={<FriendsPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="addconvention" element={<AddConvention />} />
              <Route path="chatpage" element={<ChatPage />} />
              <Route path="conventionpage" element={<ConventionPage />}>
                <Route path=":conventionId" element={<NewConvention />} />
              </Route>
              <Route path="editconvention" element={<EditConvention />} />
            </Routes>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
