import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore("userStore", {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    async fetchUser() {
      const response = await axios.get('/api/v1/users/me/');
      this.user = response.data;
    },
    async checkAuth() {
      try {
        await this.fetchUser();
        return true;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Try refreshing token if unauthorized
          try {
            await axios.post('/api/v1/token/refresh/');
            return this.checkAuth(); // Retry auth check
          } catch (refreshError) {
            console.warn("Token refresh failed", refreshError);
          }
        }
        return false;
      }
    },
    async login(values) {
      await axios.post('/api/v1/token/create/', {
        username: values.username,
        password: values.password,
      });
    },
    async logout() {
      try {
        await axios.post('/api/v1/logout/');
      } catch (error) {
        console.warn("Logout failed");
      } finally {
        this.user = null;
        this.isLoggedIn = false;
      }
    },
  }
})
