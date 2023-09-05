import axios from "axios"
const API = axios.create({ baseURL: "http://localhost:4000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    console.log("token client "+req.headers.Authorization)
    return req;
  });

 
export const usersignIn = (formData) => API.post("/login", formData)
export const userregister = (formData) => API.post("/register", formData)


export const ListTours = () => API.get('/createtour')
export const getTour = (id) => API.get(`/getTour/${id}`);

 


export const adminlogin = (formData) => API.post("/admin/login", formData)
export const createTour = (tourData) => API.post('/admin/createtour', tourData)
export const getTours = () => API.get('/admin/createtour')
export const getUsers =() => API.get('/admin/getUsers')
