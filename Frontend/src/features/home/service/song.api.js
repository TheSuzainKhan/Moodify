
import axios from "axios";


const api = axios.create({
    baseURL: "https://moodify-w92w.onrender.com",
    withCredentials: true
})


export async function getSong({ mood }) {
    const response = await api.get("/api/songs", {
        params: { mood }
    })
    return response.data
}
