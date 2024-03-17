import axios from "axios";

const instance = axios.create({
  baseURL: "https://koneksion.raihankusuma.tech/",
});

export default instance
