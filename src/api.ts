import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.banchangohub.com/v3/admin/',
});

export const userApi = {
  signIn: (body: object) => api.post('users/sign-in', body),
};

export const warehouseApi = {
  getWarehouses: (token: string, page: number, size: number, status?: string) =>
    api.get('warehouses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        size: size,
        status: status !== 'ALL' ? status : null,
      },
    }),
};
