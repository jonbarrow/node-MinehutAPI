const MinehutAPI = require('./src/minehut');
const Minehut = new MinehutAPI();

(async () => {

	console.log('Grabbing user data for user `Ninventoo`');
	const user_data = await Minehut.userForumData('Ninventoo');
	console.log(user_data);

	console.log('******BEGINNING SERVER MANAGMENT******');

	console.log('Logging into Minehut control panel...');
	await Minehut.getLoginSession('email', 'password');
	/*
	You can also login using:
	await Minehut.ghostLogin('your_account_token');

	or even skip login by manually setting your session data:

	Minehut.setManualSession({
		_id: 'user_id',
		token: 'account_token',
		servers: ["server_id_1", "server_id_2"]
	});
	*/

	console.log('Grabbing currently logged in user');
	const user = await Minehut.currentUser();

	console.log('Grabbing server ID of first server in list');
	const server_id = user.servers[0];

	console.log('Grabbing server instance');
	const server = Minehut.server(server_id); // Returns a new `MinehutServer` instance. Must be a server you own
	
	/*
	Minehut servers run on what's called a "service".
	These services control which box a server is on and whether or not it is sleeping.
	We must turn the service on before being able to use the server
	*/
	verifyService();

	async function verifyService() {
		console.log('Checking status');
		let status = await server.status();

		if (!status.status.service_online) {
			server.startService();

			/*
			The only way to verify the service is online is to keep pinging the servers status.
			This is actually how the official web client handles this, so it's safe
			*/
			const service_check_loop = setInterval(async () => {
				status = await server.status();
				if (status.status.service_online) {
					clearInterval(service_check_loop);
					startServer();
				} else {
					console.log('Service still offline, checking again in 2 seconds...');
				}
			}, 2000);
		} else {
			startServer();
		}
	}

	async function startServer() {
		console.log('Service online, starting server...');
		server.start();

		/*
		Just like with services, we must keep pinging the server status to see if it's online
		*/
		const server_check_loop = setInterval(async () => {
			status = await server.status();

			// Servers services are able to go to sleep during start up (I think this is a bug with Minehut?)
			// To get around this, we must also check that the service is online when trying to start the server
			if (!status.status.service_online) {
				clearInterval(server_check_loop);
				verifyService();
			} else {
				if (status.status.online) {
					clearInterval(server_check_loop);
					console.log('Server online!');

					doThings(); // Now that the server is online, we can begin working with it
				} else {
					console.log('Server still offline, checking again in 2 seconds...');
				}
			}
		}, 2000);
	}

	async function doThings() {
		server.sendCommand('say this command was sent from the NodeJS API lib made by Red');
	}
})();