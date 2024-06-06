const cloud_name = process.env.cloud_name;
const api_key = process.env.cloudinary_api_key;
const api_secret = process.env.cloudinary_api_secret;

const cloudinary = require("cloudinary").v2; // versi nodeJS
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret, // disimpan di env smua // ini ditaruh diatas aja
});

module.exports = cloudinary;
