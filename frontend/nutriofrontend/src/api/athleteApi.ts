import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/StudentListCreate/',
});

export const getStudents = () => api.get('');
export const addStudent = (data: any) => api.post('', data);
export const updateStudent = (id: number, data: any) =>
    axios.put(`/api/StudentApiListCreate/${id}/`, data);
export const deleteStudent = (id: number) =>
    axios.delete(`/api/StudentApiListDelete/${id}/`);
