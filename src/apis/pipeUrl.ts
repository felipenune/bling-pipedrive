import axios from 'axios';

//create baseurl for pripedrive api
const pipe = axios.create({
  baseURL: 'https://api.pipedrive.com/v1'
})

export default pipe;