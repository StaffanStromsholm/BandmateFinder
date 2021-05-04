import axios from 'axios';

const url = 'https://bmf-backend.herokuapp.com/users';
// const url = 'http://localhost:5000/users';

export const fetchUsers = () => axios.get(url);
export const fetchUser = (username) => axios.get(`${url}/${username}`);
export const createUser = (newUser) => axios.post(url, newUser);
export const updateUser = (id, updatedUser) => axios.patch(`${url}/${id}`, updatedUser);
