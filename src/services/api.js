import axios from 'axios';

const API_URL = 'https://683796792c55e01d184a4434.mockapi.io/api/recursos/recursos';

export const getRecursos = () => axios.get(API_URL);
export const getRecursoById = (id) => axios.get(`${API_URL}/${id}`);
export const addRecurso = (recurso) => axios.post(API_URL, recurso);
export const updateRecurso = (id, recurso) => axios.put(`${API_URL}/${id}`, recurso);
export const deleteRecurso = (id) => axios.delete(`${API_URL}/${id}`);
