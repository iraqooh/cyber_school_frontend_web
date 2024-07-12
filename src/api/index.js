import axios from 'axios';

export default axios.create({
  baseURL: 'http://46.101.198.244:3001/api/cyber_school',
  headers: {
    'Content-Type': 'application/json',
  },
});