class ApiService {


	API_BASE_URL = 'http://localhost:8080';

	async generateSession(data) {
		const apiEndpoint = '/api/v1/session/getSessions';
		const url = this.API_BASE_URL + apiEndpoint;

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		})

		return fetch(url, {
			method: 'POST',
			body: formData,
		}).then(response => response.json());
	}
}

const apiService = new ApiService();
export default apiService;
