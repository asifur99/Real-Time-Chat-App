export default {
	id: '1',
	users: [{
		id: 'u1',
		name: 'Incredible',
		imageUri: 'https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Bob-ParrMr-Incredible.The-Incredibles.webp',
	}, {
		id: 'u2',
		name: 'Elon Musk',
		imageUri: 'https://cdn.vox-cdn.com/thumbor/wDvmcj9eEin57A1Nww0yBM1jASc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22386618/1229901940.jpg',
	}],
	messages: [{
		id: 'm1',
		content: 'How are you, Elon!',
		createdAt: '2020-10-10T12:48:00.000Z',
		user: {
			id: 'u1',
			name: 'Incredible',
		},
	}, {
		id: 'm2',
		content: 'I am good, good',
		createdAt: '2020-10-03T14:49:00.000Z',
		user: {
			id: 'u2',
			name: 'Elon Musk',
		},
	}, {
		id: 'm3',
		content: 'What about you?',
		createdAt: '2020-10-03T14:49:40.000Z',
		user: {
			id: 'u2',
			name: 'Elon Musk',
		},
	}, {
		id: 'm4',
		content: 'Good as well, preparing for the demonstration.',
		createdAt: '2020-10-03T14:50:00.000Z',
		user: {
			id: 'u1',
			name: 'Incredible',
		},
	}, {
		id: 'm5',
		content: 'How is SpaceX doing?',
		createdAt: '2020-10-03T14:51:00.000Z',
		user: {
			id: 'u1',
			name: 'Incredible',
		},
	}, {
		id: 'm6',
		content: 'going to the Moooooon',
		createdAt: '2020-10-03T14:49:00.000Z',
		user: {
			id: 'u2',
			name: 'Elon Musk',
		},
	}, {
		id: 'm7',
		content: 'btw, for the demo president Einstein is gonna be there',
		createdAt: '2020-10-03T14:53:00.000Z',
		user: {
			id: 'u2',
			name: 'Elon Musk',
		},
	}]
}

