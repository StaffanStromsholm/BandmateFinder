import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
    
    const getUser = () => {
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      return user
    }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser())

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const saveUser = userUser => {
    sessionStorage.setItem('user', JSON.stringify(userUser));
    setUser(userUser);
  }

  return {
    setToken: saveToken,
    token,
    setUser: saveUser,
    user 
  }
}