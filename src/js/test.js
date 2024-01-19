import { CapacitorHttp, HttpResponse } from '@capacitor/core';

// Example of a GET request
const doGet = async () => {
  const options = {
    url: `https://tycoon-2epova.users.cfx.re/status/widget/players.json`,
    params: { size: 'XL' },
  };

  try {
    const response = await CapacitorHttp.get(options);
    console.log(response);
    // Handle the response as needed
  } catch (error) {
    console.error('Error:', error);
    // Handle the error
  }
};

// Example of a POST request. Note: data
// can be passed as a raw JS Object (must be JSON serializable)
const doPost = async () => {
  const options = {
    url: `https://tycoon-2epova.users.cfx.re/status/widget/players.json`,
    headers: { 'X-Fake-Header': 'Fake-Value' },
    data: { foo: 'bar' },
  };

  try {
    const response = await CapacitorHttp.post(options);
    console.log(response);
    // Handle the response as needed
  } catch (error) {
    console.error('Error:', error);
    // Handle the error
  }
};

// Call the functions
doGet();
doPost();