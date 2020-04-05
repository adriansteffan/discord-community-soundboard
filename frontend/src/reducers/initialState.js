const initialState = {

	currentInformation: {
		authToken : null,
		guild: null,
		collection: [],
		tags: [],
		filter: null,
	},
	menu: {
		selectedTab: 'soundclips', // other options: youtube, upload, settings
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
