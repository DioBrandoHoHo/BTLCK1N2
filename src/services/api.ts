import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface Overview {
  books: number;
  borrowings: number;
  readers: number;
  currentlyBorrowed: number;
}

export interface BorrowByMonth {
  ym: string;
  total: number;
}

export interface TopBook {
  name: string;
  times_borrowed: number;
}

export interface OverdueReader {
  id: number;
  name: string;
  email: string;
  overdue_count: number;
  earliest_due: string;
}

export const getOverview = () => api.get<{ data: Overview }>('/admin/dashboard/overview');
export const getBorrowsByMonth = (monthsBack = 12) =>
  api.get<{ data: BorrowByMonth[] }>('/admin/dashboard/charts/borrows-by-month', { params: { monthsBack } });
export const getTopBooks = (limit = 10) =>
  api.get<{ data: TopBook[] }>('/admin/dashboard/charts/top-books', { params: { limit } });
export const getOverdueReaders = () =>
  api.get<{ data: OverdueReader[] }>('/admin/dashboard/lists/overdue-readers');

export const exportBorrowingsCSV = (status?: string) =>
  api.get('/admin/export/borrowings.csv', { params: { status }, responseType: 'blob' });
export const exportBorrowingsPDF = (status?: string) =>
  api.get('/admin/export/borrowings.pdf', { params: { status }, responseType: 'blob' });
export const exportBooksExcel = () =>
  api.get('/admin/export/books.xlsx', { responseType: 'blob' });

export default api;
