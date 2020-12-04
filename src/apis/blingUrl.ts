import axios from 'axios';

//create baseurl for bling api
const bling = axios.create({
  baseURL: 'https://bling.com.br/Api/v2/'
})

export default bling;