export const storageUtil = {
  setItem(key: string, value: any, useLocal: boolean): any {
    useLocal ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value);
  },

  getString(key: string): any {
    let s = localStorage.getItem(key);
    if (!s) {
      s = sessionStorage.getItem(key);
    }

    return s;
  },

  getObject<T>(key: string): T | undefined {
    let s = localStorage.getItem(key);
    if (!s) {
      s = sessionStorage.getItem(key);
    }

    if (!s) return undefined;
    const obj = JSON.parse(s);
    return obj as T;
  },

  deleteItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};
