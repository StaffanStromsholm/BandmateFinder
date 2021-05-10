import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
    
    const getUser = () => {
      const userString = localStorage.getItem('user');
      const userUser = JSON.parse(userString);
      return userUser?.user
    }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser())

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const saveUser = userUser => {
    localStorage.setItem('user', JSON.stringify(userUser));
    setUser(userUser);
  }

  return {
    setToken: saveToken,
    token,
    setUser: saveUser,
    user 
  }
}