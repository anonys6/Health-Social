const axios = require('axios');
require('dotenv').config();
let access_token = '';
let refresh_token = '';

axios.post('https://wger.de/api/v2/token', {
    username: process.env.API_USER,
    password: process.env.API_PW,
})
.then((response) => {
    access_token = response.data.access;
    refresh_token = response.data.refresh;
    
    // Chain the second request inside the first .then() block
    return axios.get('https://wger.de/api/v2/workout/', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    });
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});
