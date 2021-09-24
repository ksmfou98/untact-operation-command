import axios from "axios";
import { SERVER_URL } from "lib/config";

const client = axios.create({
  withCredentials: true,
});
client.defaults.baseURL = `${SERVER_URL}api/v1`;

export default client;
