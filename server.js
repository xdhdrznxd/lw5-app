// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3030;

app.get('/aws-test', async (req, res) => {
  // Hardcoded URL - replace with your actual target URL
  const targetUrl = 'https://d3l1g5uumszywq.cloudfront.net/test';
  
  try {
    // Send GET request to the target URL
    const response = await axios.get(targetUrl);
    
    // Return both status code and content
    res.json({
      status: response.status,
      content: response.data
    });
  } catch (error) {
    // Handle errors
    const statusCode = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : error.message;
    
    res.status(statusCode).json({
      error: 'Error fetching from target URL',
      status: statusCode,
      message: errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});