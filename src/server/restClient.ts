import axios from 'axios';
import https from 'https';

const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const restClient = axios.create({
  baseURL: isProd ? `http://localhost:${port}/api` : 'http://localhost:3000/api',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default restClient;
