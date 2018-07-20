const got = require('got');

class WarzoneAPI {
	async leaderboard(board='kills') {
		try {
			const request = await got('https://api.warz.one/mc/leaderboard/' + board);

			const leaderboard = JSON.parse(request.body);

			return leaderboard;
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

	async match(id='latest') {
		try {
			const request = await got('https://api.warz.one/mc/match/' + id);

			const leaderboard = JSON.parse(request.body);

			return leaderboard;
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

	async user(name) {
		try {
			const request = await got('https://api.warz.one/mc/player/' + name);

			const leaderboard = JSON.parse(request.body);

			return leaderboard;
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

	async userMatch(name) {
		try {
			const request = await got('https://api.warz.one/mc/match/latest/' + name);

			const leaderboard = JSON.parse(request.body);

			return leaderboard;
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

module.exports = WarzoneAPI;