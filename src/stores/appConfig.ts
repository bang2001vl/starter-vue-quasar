import { defineStore } from "pinia";

export const MY_THEME = {
  DEFAULT: "DEFAULT",
};

type StateType = {
  theme: string;
  language: string;
};

function storageKeyOf(key: keyof StateType) {
  return `appConfig-${key}`;
}

export const useAppConfig = defineStore("store-appConfig", {
  state() {
    return {
      theme: localStorage.getItem(storageKeyOf("theme")) || MY_THEME.DEFAULT,
    } as StateType;
  },
  actions: {
    setState(key: keyof StateType, value: any) {
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
    changeTheme(newValue: keyof typeof MY_THEME) {
      this.setState("theme", newValue);
    },
  },
});
