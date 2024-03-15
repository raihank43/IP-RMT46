export default function formatDate(dateString) {
  let date = new Date(dateString);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // Bulan dimulai dari 0
  let day = ("0" + date.getDate()).slice(-2);

  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);

  let formattedDate = `${year}-${month}-${day}`;
  let formattedTime = `${hours}:${minutes}`;

//   return { date: formattedDate, time: formattedTime };
let newFormatDate = `${year}-${month}-${day} | ${hours}:${minutes}`;
return newFormatDate
}
