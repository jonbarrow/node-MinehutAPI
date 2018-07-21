const config = require('./config.json');
const MinehutAPI = require('./src/minehut');
//const WarzoneAPI = require('./src/warzone'); // The WarZone stuff seems to be dead?

const Minehut = new MinehutAPI();
//const Warzone = new WarzoneAPI(); // The WarZone stuff seems to be dead?

(async () => {

	/*
	// The WarZone stuff seems to be dead? Keeping this here incase it comes back
	console.log('Grabbing Warzone leaderboard...');
	console.log(await Warzone.leaderboard());

	console.log('Grabbing latest Warzone match info...');
	console.log(await Warzone.match());

	console.log('Grabbing Warzone user `MatrixTunnel`...');
	console.log(await Warzone.user('MatrixTunnel'));

	console.log('Grabbing Warzone user `MatrixTunnel` latest match...');
	console.log(await Warzone.userMatch('MatrixTunnel'));
	*/

	console.log('Grabbing user data for user `Ninventoo`');
	console.log(await Minehut.getUserForumData('Ninventoo'));

	console.log('Grabbing server data for PrismBlock (by ID)');
	console.log(await Minehut.getServer('5b45e51bc8b7b644e9bf7396'));

	console.log('Grabbing server data for PrismBlock by name');
	console.log(await Minehut.getServer('PrismBlock', true));

	console.log('Grabbing plugins (not logged in)');
	console.log(await Minehut.getPlugins());

	console.log('******LOGING USER******');

	console.log('Logging into Minehut control panel...');
	await Minehut.getLoginSession(config.email, config.password);
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

	// BE WARNED. YOU CANNOT DELETE SERVERS.
	console.log('******CREATING SERVER******');
	console.log(await Minehut.createServer('apitest'));

	console.log('Grabbing plugins (logged in)');
	console.log(await Minehut.getPlugins());

	console.log('******SETTING UP SERVER CONTEXT******');

	console.log('Grabbing currently logged in user');
	const user = await Minehut.getCurrentUser();

	console.log('Grabbing server ID of first server in list');
	const server_id = user.servers[0];

	console.log('Grabbing server instance');
	const server = Minehut.server(server_id); // Returns a new `MinehutServer` instance. Must be a server you own

	console.log('******BEGINNING SERVER MANAGMENT******');
	
	/*
	Minehut servers run on what's called a "service".
	These services control which box a server is on and whether or not it is sleeping.
	We must turn the service on before being able to use the server
	*/
	verifyService();

	async function verifyService() {
		console.log('Checking status');
		const status = await server.status();

		if (!status.status.service_online) {
			server.startService();

			/*
			The only way to verify the service is online is to keep pinging the servers status.
			This is actually how the official web client handles this, so it's safe
			*/
			const service_check_loop = setInterval(async () => {
				const status = await server.status();
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
			const status = await server.status();

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