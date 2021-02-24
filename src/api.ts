import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.banchangohub.com/v3/admin/',
});

export const userApi = {
  signIn: (body: object) => api.post('users/sign-in', body),
  getUsers: (token: string, page: number, size: number) =>
    api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        size: size,
      },
    }),
  searchUsersByCompanyName: (
    token: string,
    companyName: string,
    page: number,
    size: number,
  ) =>
    api.get('/users/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        size: size,
        companyName: companyName,
      },
    }),
};

export const estimateApi = {
  getEstimates: (token: string, page: number, size: number, status?: string) =>
    api.get('/estimates', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        size: size,
        status: status !== 'ALL' ? status : null,
      },
    }),
  getEstimateData: (token: string, estimateId: number) =>
    api.get(`estimates/${estimateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateStatus: (token: string, estimateId: number, body: object) =>
    api.patch(`/estimates/${estimateId}/status`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
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
  getWarehouseImages: (token: string, warehouseId: number) =>
    api.get(`warehouses/${warehouseId}/images`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  uploadMainImage: (token: string, warehouseId: number, formData: FormData) =>
    api.post(`images/main/${warehouseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }),
  uploadExtraImage: (token: string, warehouseId: number, formData: FormData) =>
    api.post(`images/${warehouseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteMainImage: (token: string, warehouseId: number) =>
    api.delete(`images/main/${warehouseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteExtraImage: (token: string, warehouseId: number, file: string) =>
    api.delete(`images/${warehouseId}?file=${file}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
