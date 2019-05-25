const got = require('got');
const MinehutServer = require('./server');

const API_BASE = 'https://api.minehut.com';
const GRAPHQL_API_BASE = 'https://api.forums.gg';

const GRAPHQL_COMMUNITY = '5ac29432e0b76e66674e0a59';
const GRAPHQL_USER_QUERY = {
	operationName: 'user',
	variables: {
		community: GRAPHQL_COMMUNITY,
		mcName: null
	},
	query: 'query user($name: String, $mcName: String, $community: ID!) {\n  user(name: $name, mcName: $mcName) {\n    _id\n    name\n    gravatar\n    minecraft {\n      _id\n      mcName\n      mcUuid\n      __typename\n    }\n    roles(community: $community) {\n      _id\n      tagVisible\n      tagName\n      tagBackgroundColor\n      tagTextColor\n      permissions\n      __typename\n    }\n    isBanned(community: $community)\n    about\n    __typename\n  }\n}\n'
};


class MinehutAPI {
	constructor() {
		this.session = null;
	}

	async getLoginSession(email, password) {
		try {
			const request = await got.post(`${API_BASE}/users/login`, {
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
			const request = await got.post(`${API_BASE}/users/ghost_login`, {
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

	async createServer(name, platform='java') {
		if (platform !== 'java') {
			// On the official web client theres a drop down here, assuming future types eventually? Getting prepared for that
			throw new Error(`Invalid server type ${platform}. Must be java`);
		}

		try {
			const request = await got.post(`${API_BASE}/servers/create`, {
				headers: {
					accept: 'application/json',
					origin: 'https://minehut.com',
					'Content-Type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					name,
					platform
				})
			});

			const server = JSON.parse(request.body);

			return server;
		} catch (error) {
			// Thanks Minehut for not following HTTP standards and throwing 400 errors even with perfectly formatted requests
			if (error.statusCode && error.statusCode == 400 && error.response && error.response.body) {
				return JSON.parse(error.response.body);
			}

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

	async getServer(id, byName) {
		let request_url = `${API_BASE}/server/${id}`;
		if (byName) {
			request_url = `${request_url}?byName=true`;
		}

		try {
			const request = await got(request_url);

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

	async getServers() {
		try {
			const request = await got(`${API_BASE}/servers`);

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

	async getTopServers() {
		try {
			const request = await got(`${API_BASE}/network/top_servers`);

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

	async getSimpleStats() {
		try {
			const request = await got(`${API_BASE}/network/simple_stats`);

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

	async getPlugins() {
		let request_url = `${API_BASE}/plugins_public`;
		let options = {};
		
		if (this.session) {
			request_url = `${API_BASE}/plugins`;
			options = {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				}
			};
		}

		try {
			const request = await got(request_url, options);

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

	async getUser(id) {
		try {
			const request = await got(`${API_BASE}/user/${id}`, {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
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

	async getCurrentUser() {
		return await this.getUser(this.session._id);
	}

	async getUserForumData(name) {
		const query = GRAPHQL_USER_QUERY;
		query.variables.mcName = name;

		try {
			const request = await got.post(`${GRAPHQL_API_BASE}/graphql`, {
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(query)
			});

			const user = JSON.parse(request.body);

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
}

module.exports = MinehutAPI;
