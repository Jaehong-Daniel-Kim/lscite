import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true,  // without this, "Authentication credentials were not provided" will be raised

})

export default function GetMe() {
    return instance.get("users/me").then((response) => response.data)
}