const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function apiRequest(endpoint, options = {}) {
  const token = sessionStorage.getItem("creamy_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Limpia sesion en caso de q el token expire
  if (response.status === 401) {
    localStorage.removeItem("creamy_token");
    localStorage.removeItem("creamy_user");
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.error || data?.message || `Error ${response.status}`);
  }

  return data;
}