import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.TMDB_BASE_URL,
    params: {
        api_key: process.env.TMDB_API_KEY,
        Language: 'vi-VN'
    }
})

export default apiClient