import axios from 'axios';

const instance = axios.create({
    baseURL: "https://startoon-bakend.onrender.com/api/v1/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
    }
})

export default instance;