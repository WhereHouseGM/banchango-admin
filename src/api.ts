import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.banchangohub.com/v3/',
});

export const userApi = {
  signIn: (body: object) => api.post('users/sign-in', body),
};
