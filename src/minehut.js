const got = require('got');
const MinehutServer = require('./server');

const GRAPHQL_COMMUNITY = '5ac29432e0b76e66674e0a59';
const GRAPHQL_USER_QUERY = {
	operationName: 'user',
	variables: {
		community: GRAPHQL_COMMUNITY,
		mcName: null
	},
	query: 'query user($name: String, $mcName: String, $community: ID!) {\n  user(name: $name, mcName: $mcName) {\n    _id\n    name\n    gravatar\n    minecraft {\n      _id\n      mcName\n      mcUuid\n      __typename\n    }\n    roles(community: $community) {\n      _id\n      tagVisible\n      tagName\n      tagBackgroundColor\n      tagTextColor\n      permissions\n      __typename\n    }\n    isBanned(community: $community)\n    about\n    __typename\n  }\n}\n'
}


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

	async userForumData(name) {
		const query = GRAPHQL_USER_QUERY;
		query.variables.mcName = name;

		try {
			const request = await got.post('https://api.forums.gg/graphql', {
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