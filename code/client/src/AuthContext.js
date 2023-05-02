import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [auth, setAuth] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );
  const [userProfileData, setUserProfileData] = useState(
    localStorage.getItem("userProfileData")
      ? JSON.parse(localStorage.getItem("userProfileData"))
      : null
  );
  const navigate = useNavigate();

  const fetchUserData = async (tokens) => {
    const response = await fetch("http://localhost:8000/api/whoami", {
      headers: {
        Authorization: "Bearer ".concat(tokens.access),
      },
    }).then((res) => res.json());

    localStorage.setItem("userData", JSON.stringify(response.user_data));
    localStorage.setItem(
      "userProfileData",
      JSON.stringify(response.user_profile_data)
    );
    setUserData(response.user_data);
    setUserProfileData(response.user_profile_data);
  };

  const loginUser = async (data) => {
    const response = await fetch("http://localhost:8000/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const tokens = await response.json();

    if (response?.status == 200 && tokens) {
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
      await fetchUserData(tokens);
      navigate("/");
    } else if (response?.status == 401) {
      console.log("Unauthorized!");
    } else {
      console.log("Something went wrong while logging in the user!");
      console.log(response);
    }
  };

  const logoutUser = (e) => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    localStorage.removeItem("userProfileData");
    setAuthTokens(null);
    setUser(null);
    setUserData(null);
    setUserProfileData(null);
    navigate("/");
  };

  const updateToken = async () => {
    const currentTokens = localStorage.getItem("authTokens");

    if (currentTokens) {
      const response = await fetch("http://localhost:8000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: currentTokens.refresh }),
      });
      const tokens = await response.json();

      if (response?.status == 200 && tokens) {
        const newTokens = {
          refresh: currentTokens.refresh,
          access: tokens.access,
        };
        localStorage.setItem("authTokens", JSON.stringify(newTokens));
        setAuthTokens(tokens);
        setUser(jwtDecode(tokens.access));
        await fetchUserData(tokens);
      } else if (response?.status == 401) {
        console.log("Unauthorized!");
        logoutUser();
      } else {
        console.log("Something went wrong while logging in the user!");
        console.log(response);
        logoutUser();
      }
    }
  };

  // Do every hour
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Refreshing access token");
      updateToken();
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    auth: auth,
    setAuth: setAuth,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};