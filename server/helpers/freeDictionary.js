const axios = require("axios");

async function freeDictionaryAPI(message) {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${message}`
    );

    // Menggabungkan semua definisi menjadi satu array
    const allDefinitions = response.data[0].meanings.flatMap(
      (el) => el.definitions
    );
    if (!allDefinitions) {
      throw { name: "Not Found" };
    }

    // Memilih definisi secara acak
    const randomDefinition =
      allDefinitions[Math.floor(Math.random() * allDefinitions.length)];

    return randomDefinition;
  } catch (error) {
    console.log(error);
  }
}

module.exports = freeDictionaryAPI



