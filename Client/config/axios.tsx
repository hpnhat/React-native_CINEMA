import axios from "axios";
const instance = axios.create({
  baseURL: "http://192.168.1.2:2712/api",
});
export default instance;
