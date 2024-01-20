const key = "L0S8ktFi2WlKaNntwjJZCY8Q6wOwAzggHu0PD";
const targetUrl = `https://tycoon-2epova.users.cfx.re/status/widget/players.json`;
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const headerData = {
  'X-Tycoon-Key': key,
  // Add any other headers if needed
};

fetch(proxyUrl + targetUrl, {
  method: 'GET',
  headers: headerData, // You can include headers here if needed
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));