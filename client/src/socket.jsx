import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://koneksion.raihankusuma.tech/"
    : "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false,
});
