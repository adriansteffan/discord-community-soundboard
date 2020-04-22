const initialState = {

	currentInformation: {
		authToken : null,
		authTokenExpired: false,
		guild: null,
		collection: [],
		tags: [],
	},
	menu: {
		activeTab: 'soundclips', // other options: youtube, upload, settings
	},
	backendData:
	{
		loaded: false,
		payload: {
			roles: [],
			permissions: [],
			guilds: [],
			collections: [],
			tags: [],
			sound_clips: []
		},
	} ,
};

export default initialState;
