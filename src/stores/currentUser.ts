import { defineStore } from "pinia";

type CurrentUserStateType = {
  accessToken: string | null;
  refreshToken: string | null;
  deviceCode: string | null;
  username: string | null;
  displayName: string | null;
};

function storageKeyOf(key: keyof CurrentUserStateType) {
  return `localStorage-${key}`;
}

export const useCurrentUser = defineStore("store-currentUser", {
  state() {
    // Init state for first-time
    const firstLoadState: CurrentUserStateType = {
      // Auth
      accessToken: localStorage.getItem(storageKeyOf("accessToken")),
      refreshToken: localStorage.getItem(storageKeyOf("refreshToken")),
      deviceCode: localStorage.getItem(storageKeyOf("deviceCode")),
      // User information
      username: localStorage.getItem(storageKeyOf("username")),
      displayName: localStorage.getItem(storageKeyOf("displayName")),
    };
    return firstLoadState;
  },
  actions: {
    setState(key: keyof CurrentUserStateType, value: string | null) {
      // Set State
      this[key] = value;

      // Change at localStorage
      const storageKey = storageKeyOf(key);
      if (value == null) {
        // Remove if null
        localStorage.removeItem(storageKey);
      } else {
        // Update value
        localStorage.setItem(storageKey, value);
      }
    },
    async login() {
      // TODOs: Call api

      // Save result
      this.setState("accessToken", "GET-FROM-API");
      this.setState("refreshToken", "GET-FROM-API");
      this.setState("deviceCode", "GET-FROM-API");
    },
    async loadUserInfo() {
      // TODOs: Call api

      // Save result
      this.setState("username", "GET-FROM-API");
      this.setState("displayName", "GET-FROM-API");
    },
    async logout() {
      // TODOs: Call api

      // Clear all state
      this.setState("accessToken", null);
      this.setState("refreshToken", null);
      this.setState("deviceCode", null);
    },
  },
});
