import { defineStore } from 'pinia'
import axios from 'axios'

export default defineStore("userStore", {
  state: () => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
  }),
  actions: {
    async login(values) {
      const response = await axios.post(
        '/api/v1/jwt/create/',
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        }
      )
      this.accessToken = response.data.access;
      this.refreshToken = response.data.refresh;
      this.isLoggedIn = true;
      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("refreshToken", this.refreshToken);
    },
    logout() {
      this.isLoggedIn = false;
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    async refreshToken() {
      try {
        if (this.refreshToken) return;
        const response = await axios.post(
          '/api/v1/jwt/refresh',
          {
            refresh: this.refreshToken,
          }
        )
        this.accessToken = response.data.access;
        localStorage.setItem("accessToken", this.accessToken);
      }
      catch (error) {
        console.log("Token Refresh Failed", error);
        this.logout();
      }
    }
  }
})
