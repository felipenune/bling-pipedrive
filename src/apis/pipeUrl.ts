import axios from 'axios';

const pipe = axios.create({
  baseURL: 'https://api.pipedrive.com/v1'
})

export default pipe;