const got = require('got');
const MinehutServer = require('./server');

class MinehutAPI {
	constructor() {
		this.session = null;
	}

	async getLoginSession(email, password) {
		try {
			const request = await got.post('https://pocket.minehut.com/users/login', {
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});
			
			const session = JSON.parse(request.body);

			this.session = session;
			return session;
		} catch (error) {
			if (error.response.body) {
				try {
					throw new Error(JSON.parse(error.response.body).error);
				} catch (error) {
					throw new Error(error.response.body);
				}
			} else {
				throw new Error(error);
			}
		}
	}

	async ghostLogin(token) {
		try {
			const request = await got.post('https://pocket.minehut.com/users/ghost_login', {
				headers: {
					'content-type': 'application/json',
					'authorization': token
				},
				body: JSON.stringify({})
			});

			const session = JSON.parse(request.body);

			this.session = session;
			return session;
		} catch (error) {
			if (error.response.body) {
				try {
					throw new Error(JSON.parse(error.response.body).error);
				} catch (error) {
					throw new Error(error.response.body);
				}
			} else {
				throw new Error(error);
			}
		}
	}

	setManualSession(session_data) {
		this.session = session_data;
	}

	server(id) {
		return new MinehutServer(id, this.session);
	}

	async servers() {
		try {
			const request = await got('https://pocket.minehut.com/servers');

			const servers = JSON.parse(request.body);

			return servers;
		} catch (error) {
			if (error.response.body) {
				try {
					throw new Error(JSON.parse(error.response.body).error);
				} catch (error) {
					throw new Error(error.response.body);
				}
			} else {
				throw new Error(error);
			}
		}
	}

	async topServers() {
		try {
			const request = await got('https://pocket.minehut.com/network/top_servers');

			const servers = JSON.parse(request.body);

			return servers;
		} catch (error) {
			if (error.response.body) {
				try {
					throw new Error(JSON.parse(error.response.body).error);
				} catch (error) {
					throw new Error(error.response.body);
				}
			} else {
				throw new Error(error);
			}
		}
	}

	async simpleStats() {
		try {
			const request = await got('https://pocket.minehut.com/network/simple_stats');

			const stats = JSON.parse(request.body);

			return stats;
		} catch (error) {
			if (error.response.body) {
				try {
					throw new Error(JSON.parse(error.response.body).error);
				} catch (error) {
					throw new Error(error.response.body);
				}
			} else {
				throw new Error(error);
			}
		}
	}

	async plugins() {
		try {
			const request = await got('https://pocket.minehut.com/plugins');

			const plugins = JSON.parse(request.body);

			return plugins;
		} catch (error) {
			if (error.response.body) {
				try {
					throw new Error(JSON.parse(error.response.body).error);
				} catch (error) {
					throw new Error(error.response.body);
				}
			} else {
				throw new Error(error);
			}
		}
	}

	async user(id) {
		try {
			const request = await got('https://pocket.minehut.com/user/' + id, {
				headers: {
					'authorization': this.session.token
				}
			});

			const user = JSON.parse(request.body).user;

			return user;
		} catch (error) {
			if (error.response.body) {
				try {
					throw new Error(JSON.parse(error.response.body).error);
				} catch (error) {
					throw new Error(error.response.body);
				}
			} else {
				throw new Error(error);
			}
		}
	}

	async currentUser() {
		return await this.user(this.session._id);
	}
}

module.exports = MinehutAPI;