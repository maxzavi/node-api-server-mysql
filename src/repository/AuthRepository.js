const axios = require('axios')
const getUser = async (authorization) => {
    return await axios.get(
        process.env.URL_AUTH,
        {
            headers: {
                Authorization: authorization
            }
        }
    ).then(res => {
        return { status: 200, message: res.data };
    }).catch(err => {
        return { status: err.response.status, message: err.response.data.message || 'Unauthorized' };
    });
}

module.exports = { getUser }