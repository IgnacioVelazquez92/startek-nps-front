import axios from "axios";

export class ApiClient {
  client;
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BACKEND,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  async getNpsbyEmail(email) {
    return this.client.get(`/get-by-email/${email}`);
  }

  async getNpsbyU(usuarioU) {
    return this.client.get(`/get-by-user/${usuarioU}`);
  }

  async getAll() {
    return this.client.get(`/get-all`);
  }
}
