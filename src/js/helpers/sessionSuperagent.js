import Cookies from 'js-cookie';
/* The superagent-use module returns a clone of the superagent provided with the new functionality. */
const Superagent = require('superagent-use')(require('superagent'));

Superagent.use((req) => {
    req.set('X-Session-ID', Cookies.get('session'));
    return req;
});


export default Superagent;
