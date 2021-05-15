import axios from "axios";

const PORT = 8080;
const URL = `http://127.0.0.1:${PORT}`;

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

const backend = {
  signIn: async (email, password) => {
    const resp = await api.get("/auth/login", {
      params: {
        email,
        password,
      },
    });

    return resp.data;
  },
  signUpClient: async (userData) => {
    const resp = await api.post("/auth/add-user/user", userData);
    return resp.data;
  },
  signUpAdmin: async (adminData) => {
    const resp = await api.post("/auth/add-user/admin", adminData);
    return resp.data;
  },
  getProductsShopLog: async (userID) => {
    const resp = await api.get(`/products/${userID}`);

    return resp.data;
  },
  AddProduct: async (data) => {
    const resp = await api.post("/products", { data });

    return resp;
  },
  AddService: async (data) => {
    const resp = await api.post("/services", { data });

    return resp;
  },
  AddPet: async (PetData, userId) => {
    const resp = await api.post(`/pets/${userId}`, { PetData });

    return resp.data;
  },
  getProducts: async (_) => {
    const resp = await api.get(`/products`);

    return resp.data;
  },
  getServices: async (_) => {
    const resp = await api.get(`/services`);

    return resp.data;
  },
  updateProduct: async ({ _id, ...Product }) => {
    const resp = await api.post(`/products/${_id}`, { Product });

    return resp.data;
  },
  updateService: async ({ _id, ...Product }) => {
    const resp = await api.post(`/services/${_id}`, { Product });

    return resp.data;
  },
  deleteProduct: async (_id) => {
    const resp = await api.post(`/products/delete/${_id}`);

    return resp.data;
  },
  deleteService: async (_id) => {
    const resp = await api.post(`/services/delete${_id}`);

    return resp.data;
  },
  removePet: async (id, PetName) => {
    const resp = await api.delete(`/pets/${id}`, {
      params: {
        PetName,
      },
    });

    return resp.data;
  },
  getProductsHighlights: async (_) => {
    const resp = await api.get("/products/highlights");

    return resp.data;
  },
  getPromotions: async (_) => {
    const resp = await api.get("/products/promotions");

    return resp.data;
  },
  getAppointmentDetail: async (AppointmentID) => {
    const resp = await api.get(`/appointments/${AppointmentID}`);

    return resp.data;
  },
  getPetAppointment: async (userId) => {
    const resp = await api.get(`/appointments/pet/${userId}`);

    return resp.data;
  },
  bookAppointment: async (ClientData, PetData) => {
    const resp = await api.post("/appointments", { ClientData, PetData });

    return resp.data;
  },

  getAllFutureAppointments: async (_) => {
    const resp = await api.get("/appointments");

    return resp.data;
  },
  buyProducts: async (Products) => {
    await api.post("/products/buy", Products);
    return { msg: "Sucesso" };
  },
};

export default backend;
