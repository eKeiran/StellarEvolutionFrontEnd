import axios from 'axios';

const sendPostRequest = async () => {
  // Define the data you want to send to the Django view
  const data = {
    bv: 0.8,  // Replace with your actual data
    plx: 10,  // Replace with your actual data
    vmag: 5.0,  // Replace with your actual data
    spType: 'F',  // Replace with your actual data
  };

  try {
    const response = await axios.post('http://localhost:8000/predict/', data);

    // Handle the response
    if (response.status === 200) {
      // The request was successful, and you can access the data from the response.
      console.log('Response Data:', response.data);
    } else {
      // Handle other status codes or errors
      console.error('Error:', response.data);
    }
  } catch (error) {
    // Handle network errors or exceptions
    console.error('Error:', error);
  }
};

// Call the function to send the POST request
export default sendPostRequest;
