import Superagent from 'superagent-use';
import Cookies from 'js-cookie';

Superagent.use((req) => {
	req.set('X-Session-ID', Cookies.get('session'));
	return req;
});


export default Superagent;