import { Routes, Route } from 'react-router-dom';
import React from 'react';
import SignUpPage from '../pages/signUp-page/signUp-page';
import SignInPage from '../pages/signIn-page/signIn-page';
import HomePage from '../pages/home-page/home-page';
import PrivateRoute from './private-routes';

const TasksPage = React.lazy(() => import('../pages/tasks-page/tasks-page'));
const CompletedPage = React.lazy(() => import('../pages/completed-page/completed-page'));

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<SignUpPage />}
			/>
			<Route
				path='/login'
				element={<SignInPage />}
			/>
			<Route element={<PrivateRoute />}>
				<Route
					path='/home'
					element={<HomePage />}
				>
					<Route
						path='tasks'
						element={<TasksPage />}
					/>
					<Route
						path='completed-task'
						element={<CompletedPage />}
					/>
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
