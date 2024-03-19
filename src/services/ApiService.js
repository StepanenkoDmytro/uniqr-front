class ApiService {

	DOMAIN = 'http://45.77.60.247';
	PORT = '8081'
	API_BASE_URL = `${this.DOMAIN}:${this.PORT}`;
	CLIENT_ID = location.pathname.replace('/', '');

	async generateSession(data) {
		const apiEndpoint = `/api/v1/clients/${this.CLIENT_ID}/createSession`;
		const url = this.API_BASE_URL + apiEndpoint;

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		})

		return fetch(url, {
			method: 'POST',
			body: formData,
		}).then(response => {
			if (!response.ok) {
				throw new Error(response.status.toString());
			}

			response.json()
		});
	}

	async getSessionInfo(sessionId) {
		const apiEndpoint = `/api/v1/clients/${this.CLIENT_ID}/getSessions/${sessionId}`;
		const url = this.API_BASE_URL + apiEndpoint;
		return fetch(url, {
			method: 'GET',
		}).then(response => response.json());
	}

	async getSessions() {
		const apiEndpoint = `/api/v1/clients/${this.CLIENT_ID}/getSessions`;
		const url = this.API_BASE_URL + apiEndpoint;

		return fetch(url, {
			method: 'GET',
		}).then(response => response.json());
	}

	async checkQR(qrId) {
		const apiEndpoint = `/api/v1/checkQR/${qrId}`;
		const url = this.API_BASE_URL + apiEndpoint;

		return fetch(url, {
			method: 'GET',
		}).then(response => response.json());
	}
}

const apiService = new ApiService();
export default apiService;
