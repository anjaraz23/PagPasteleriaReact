import { apiRequest } from "./api";

// AUTH 
export const authService = {
  login: (credenciales) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credenciales),
    }),

  register: (datosUsuario) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(datosUsuario),
    }),
};

// PRODUCTOS 
export const productoService = {
  obtenerTodos: async () => {
    const data = await apiRequest("/productos");
    // Extrae el arreglo desde HATEOAS (_embedded) o devuelve el array directo
    return data?._embedded?.productoList || data?._embedded?.productos || data || [];
  },

  obtenerPorId: (id) => apiRequest(`/productos/${id}`),

  crear: (producto) =>
    apiRequest("/productos", {
      method: "POST",
      body: JSON.stringify(producto),
    }),

  actualizar: (id, producto) =>
    apiRequest(`/productos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(producto),
    }),

  eliminar: (id) =>
    apiRequest(`/productos/${id}`, {
      method: "DELETE",
    }),
};

// COMPRAS Y ENCARGOS
export const compraService = {
  crearPedido: (pedido) =>
    apiRequest("/compras", {
      method: "POST",
      body: JSON.stringify(pedido),
    }),

  obtenerPedidos: async () => {
    const data = await apiRequest("/compras");
    return data?._embedded?.pedidoList || data?._embedded?.pedidos || data || [];
  },

  crearEncargo: (encargo) =>
    apiRequest("/compras/encargos", {
      method: "POST",
      body: JSON.stringify(encargo),
    }),

  obtenerEncargos: async () => {
    const data = await apiRequest("/compras/encargos");
    return data?._embedded?.encargoList || data?._embedded?.encargos || data || [];
  },
};

// CONTENIDO: BLOGS Y CONTACTO
export const contenidoService = {
  obtenerBlogs: async () => {
    const data = await apiRequest("/contenido/blogs");
    return data?._embedded?.blogList || data?._embedded?.blogs || data || [];
  },

  enviarContacto: (mensaje) =>
    apiRequest("/contenido/contacto", {
      method: "POST",
      body: JSON.stringify(mensaje),
    }),
};