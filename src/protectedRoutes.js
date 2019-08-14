import React from 'react';
import ReportsView from './ReportsView';
import Logout from './Logout';
import ListPoll from './components/PollList';
import CreateOpenPollScreen from './components/CreateOpenPollScreen';

const protectedRoutes = [
  {
		name: 'logout',
		exact: true,
		path: '/logout',
		main: props => <Logout {...props} />,
		public: false,
	},
	{
		name: 'PollList',
		exact: true,
		path: '/polllist',
		main: props => <ListPoll {...props} />,
		public: false,
	},
	{
		name: 'CreateOpenPollScreen',
		exact: true,
		path: '/',
		main: props => <CreateOpenPollScreen {...props} />,
		public: false,
	},
];

export default protectedRoutes;