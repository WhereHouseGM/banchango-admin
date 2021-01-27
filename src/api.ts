import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-api.banchangohub.com/v3/admin/',
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
  updateWarehouses: (token: string, warehouseId: number, body: object) =>
    api.put(`warehouses/${warehouseId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getWarehouseData: (token: string, warehouseId: number) =>
    api.get(`warehouses/${warehouseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
