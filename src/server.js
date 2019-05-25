const got = require('got');

const API_BASE = 'https://api.minehut.com';

class MinehutServer {
	constructor(id, session) {
		this.id = id;
		this.session = session;
	}

	async startService() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/start_service`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async stopService() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/destroy_service`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async start() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/start`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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


	async stop() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/shutdown`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async sendCommand(command) {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/send_command`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					command: command ? command : 'say test'
				})
			});

			const response = JSON.parse(request.body);

			return response;
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
			const request = await got(`${API_BASE}/server/${this.id}/plugins`, {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				}
			});

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

	async status() {
		try {
			const request = await got(`${API_BASE}/server/${this.id}/status`, {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				}
			});

			const server = JSON.parse(request.body);

			return server;
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

	async data() {
		try {
			const request = await got(`${API_BASE}/server/${this.id}/server_data`, {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				}
			});

			const server = JSON.parse(request.body);

			return server;
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

	async credits() {
		try {
			const request = await got(`${API_BASE}/credits/server/${this.id}`, {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				}
			});

			const credits = JSON.parse(request.body);

			return credits;
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

	async listFiles(path) {
		try {
			const request = await got(`${API_BASE}/file/${this.id}/list/${path}`, {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				}
			});

			const files = JSON.parse(request.body);

			return files;
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

	async readFile(path) {
		try {
			const request = await got(`${API_BASE}/file/${this.id}/read/${path}`, {
				headers: {
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				}
			});

			const file = JSON.parse(request.body);

			return file;
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

	async editFile(path, content) {
		try {
			const request = await got.post(`${API_BASE}/file/${this.id}/edit/${path}`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					content: content
				})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async deleteFile(path) {
		try {
			const request = await got.post(`${API_BASE}/file/${this.id}/delete/${path}`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async changeName(name) {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/change_name`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					name: name
				})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async visibility(bool) {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/visibility`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					visibility: bool
				})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async changeMOTD(motd) {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/change_motd`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					motd: motd
				})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async save() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/save`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async changeProperties(props) {
		props.forEach(async property => {
			try {
				const request = await got.post(`${API_BASE}/server/${this.id}/edit_server_properties`, {
					headers: {
						'content-type': 'application/json',
						'authorization': this.session.token,
						"x-session-id": this.session.sessionId
					},
					body: JSON.stringify(property)
				});
	
				const response = JSON.parse(request.body);
	
				return response;
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
		});
	}

	async resetWorld() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/reset_wolrd`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async resetPlugin(id) {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/remove_plugin_data`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					plugin: id
				})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async installPlugin(id) {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/install_plugin`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({
					plugin: id
				})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async repair() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/repair_files`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

	async resetAll() {
		try {
			const request = await got.post(`${API_BASE}/server/${this.id}/reset_all`, {
				headers: {
					'content-type': 'application/json',
					'authorization': this.session.token,
					"x-session-id": this.session.sessionId
				},
				body: JSON.stringify({})
			});

			const response = JSON.parse(request.body);

			return response;
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

module.exports = MinehutServer;
