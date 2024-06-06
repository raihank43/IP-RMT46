import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://koneksion.raihandeploy.my.id/"
      : "http://localhost:3000",
});

export default instance;
