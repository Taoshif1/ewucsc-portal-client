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

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logoutUser = async () => {
    localStorage.removeItem("access-token");
    setBackendUser(null);
    return signOut(auth);
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      setBackendUser(null);
      return null;
    }

    try {
      setProfileLoading(true);
      const res = await api.get("/profile");
      setBackendUser(res.data.user);
      return res.data.user;
    } catch {
      setBackendUser(null);
      localStorage.removeItem("access-token");
      return null;
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
    if (user && localStorage.getItem("access-token")) {
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
