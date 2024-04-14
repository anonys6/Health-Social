// const axios = require('axios');
// require('dotenv').config();
// let access_token = '';
// let refresh_token = '';

// axios.post('https://wger.de/api/v2/token', {
//     username: process.env.API_USER,
//     password: process.env.API_PW,
// })
//     .then((response) => {
//         access_token = response.data.access;
//         refresh_token = response.data.refresh;

//         // Chain the second request inside the first .then() block
//         return axios.get('https://wger.de/api/v2/workout/', {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             }
//         });
//     })
//     .then((response) => {
//         console.log(response.data);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
















// const axios = require('axios');
// require('dotenv').config();
// let access_token = '';
// let refresh_token = '';

// function refreshTokenAndRetry(error) {
//     if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
//         return axios.post('https://wger.de/api/v2/token/refresh', {
//             refresh: refresh_token
//         })
//             .then((response) => {
//                 access_token = response.data.access;
//                 // Update the Authorization header with the new access token
//                 error.config.headers['Authorization'] = `Bearer ${access_token}`;
//                 error.config.__isRetryRequest = true;
//                 return axios(error.config);
//             });
//     }
//     throw error;
// }

// axios.post('https://wger.de/api/v2/token', {
//     username: process.env.API_USER,
//     password: process.env.API_PW,
// })
//     .then((response) => {
//         access_token = response.data.access;
//         refresh_token = response.data.refresh;

//         return axios.get('https://wger.de/api/v2/ingredient/', {
//             headers: {
//                 Authorization: `Bearer ${access_token}`,
//             }
//         });
//     })
//     .then((response) => {
//         console.log(response.data);
//     })
//     .catch(refreshTokenAndRetry)
//     .catch((error) => {
//         console.error(error);
//     });











const axios = require('axios');
require('dotenv').config();
let access_token = '';
let refresh_token = '';

async function refreshTokenAndRetry(error) {
    if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
        const response = await axios.post('https://wger.de/api/v2/token/refresh', {
            refresh: refresh_token
        });
        access_token = response.data.access;
        // Update the Authorization header with the new access token
        error.config.headers['Authorization'] = `Bearer ${access_token}`;
        error.config.__isRetryRequest = true;
        return axios(error.config);
    }
    throw error;
}

async function fetchData() {
    try {
        const response = await axios.post('https://wger.de/api/v2/token', {
            username: process.env.API_USER,
            password: process.env.API_PW,
        });
        access_token = response.data.access;
        refresh_token = response.data.refresh;

        const dataResponse = await axios.get('https://wger.de/api/v2/ingredient/', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        });

        // console.log(dataResponse.data);

        // const { results[0].name } = dataResponse.data;
        // console.log(results);

        // const { data } = dataResponse;

        // data.forEach(({ name }) => {
        //     console.log(name);
        // });

        // dataResponse.forEach(({ name }) => {
        //     console.log(name);
        // });

        const temp = dataResponse.data;

        temp.results.forEach(({ name }) => {
            console.log(name);
        });






    } catch (error) {
        try {
            await refreshTokenAndRetry(error);
        } catch (refreshError) {
            console.error(refreshError);
        }
    }
}

fetchData();

