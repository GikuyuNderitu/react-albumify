import axios from 'axios';

const api = {
	register(payload) {
		axios.post('/auth')
	}
}