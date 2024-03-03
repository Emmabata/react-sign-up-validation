import axios from 'axios';

export default axios.create({
    baseURL: 'http://local:5001'
});