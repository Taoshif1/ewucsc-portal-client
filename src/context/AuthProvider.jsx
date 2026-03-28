import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import { api } from "../services/api";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = async () => {
    localStorage.removeItem("access-token");
    setBackendUser(null);
    return signOut(auth);
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      setBackendUser(null);
      return;
    }

    try {
      setProfileLoading(true);
      const res = await api.get("/profile");
      console.log("Backend profile fetched:", res.data.user);
      setBackendUser(res.data.user);
    } catch (error) {
      console.error("Profile fetch failed:", error);
      setBackendUser(null);
      localStorage.removeItem("access-token");
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        setBackendUser(null);
        localStorage.removeItem("access-token");
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const authInfo = {
    user,
    backendUser,
    loading,
    profileLoading,
    registerUser,
    loginUser,
    logoutUser,
    setBackendUser,
    fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
