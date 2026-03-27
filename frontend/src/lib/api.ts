import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res.data?.data ?? res.data,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const { data } = await axios.post('/api/auth/refresh', { refreshToken })
        localStorage.setItem('accessToken', data.data.accessToken)
        original.headers.Authorization = `Bearer ${data.data.accessToken}`
        return api(original)
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(err.response?.data ?? err)
  },
)

// API 함수 모음
export const authApi = {
  register: (data: { email: string; password: string; nickname: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
}

export const userApi = {
  getMe: () => api.get('/users/me'),
  updateProfile: (data: any) => api.put('/users/me', data),
}

export const goalApi = {
  getActive: () => api.get('/goals/active'),
  getAll: () => api.get('/goals'),
  create: (data: any) => api.post('/goals', data),
  update: (id: string, data: any) => api.put(`/goals/${id}`, data),
  getTdee: (weight: number) => api.get(`/goals/tdee?weight=${weight}`),
}

export const foodApi = {
  search: (q: string) => api.get(`/foods/search?q=${encodeURIComponent(q)}`),
  findByBarcode: (barcode: string) => api.get(`/foods/barcode/${barcode}`),
  getFrequent: () => api.get('/foods/frequent'),
  getRecent: () => api.get('/foods/recent'),
  createItem: (data: any) => api.post('/foods', data),
  getLogs: (date: string) => api.get(`/food-logs?date=${date}`),
  getSummary: (date: string) => api.get(`/food-logs/summary?date=${date}`),
  createLog: (data: any) => api.post('/food-logs', data),
  updateLog: (id: string, data: any) => api.put(`/food-logs/${id}`, data),
  deleteLog: (id: string) => api.delete(`/food-logs/${id}`),
}

export const workoutApi = {
  getTemplates: (q?: string) => api.get(`/workouts/templates${q ? `?q=${q}` : ''}`),
  getLogs: (date: string) => api.get(`/workout-logs?date=${date}`),
  createLog: (data: any) => api.post('/workout-logs', data),
  updateLog: (id: string, data: any) => api.put(`/workout-logs/${id}`, data),
  deleteLog: (id: string) => api.delete(`/workout-logs/${id}`),
  addSets: (id: string, sets: any[]) => api.post(`/workout-logs/${id}/sets`, { sets }),
}

export const metricsApi = {
  getAll: (from?: string, to?: string) =>
    api.get(`/body-metrics${from ? `?from=${from}&to=${to}` : ''}`),
  getLatest: () => api.get('/body-metrics/latest'),
  create: (data: any) => api.post('/body-metrics', data),
  update: (id: string, data: any) => api.put(`/body-metrics/${id}`, data),
  delete: (id: string) => api.delete(`/body-metrics/${id}`),
}

export const analyticsApi = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getWeightTrend: (days?: number) =>
    api.get(`/analytics/weight-trend${days ? `?days=${days}` : ''}`),
  getCalorieTrend: (days?: number) =>
    api.get(`/analytics/calorie-trend${days ? `?days=${days}` : ''}`),
  getMacroBreakdown: (from: string, to: string) =>
    api.get(`/analytics/macro-breakdown?from=${from}&to=${to}`),
  getGoalProgress: () => api.get('/analytics/goal-progress'),
  getWeeklyReport: () => api.get('/analytics/weekly-report'),
}

export const notificationsApi = {
  getAll: () => api.get('/notifications'),
  markRead: (id: string) => api.patch(`/notifications/${id}/read`),
}

export const achievementsApi = {
  getMy: () => api.get('/achievements'),
  getAll: () => api.get('/achievements/available'),
}
