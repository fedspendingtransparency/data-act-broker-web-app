import Cookies from 'js-cookie';

const Request = require('superagent-use')(require('superagent'));

Request.use((req) => {
    req.set('X-Session-ID', Cookies.get('session'));
    return req;
});


export default Request;
