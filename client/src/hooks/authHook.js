import { useCallback, useEffect, useState } from "react";

const STORAGE_NAME = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  const login = useCallback((jwtToken, id, email) => {
    setToken(jwtToken);
    setUserId(id);
    setEmail(email);

    localStorage.setItem(
      STORAGE_NAME,
      JSON.stringify({ userId: id, token: jwtToken, email: email })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setEmail(null);

    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (data && data.token) {
      login(data.token, data.userId, data.email);
    }
  }, [login]);

  return { login, logout, token, userId, email };
};
