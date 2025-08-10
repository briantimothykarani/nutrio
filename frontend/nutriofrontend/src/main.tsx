import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import App from './App';
import AddAthlete from './components/AddAthlete';
import AddAthleteb from './components/Addathleteb';
import AddAthletec from './components/Addathletec';
import AthleteSummaryBasic from './components/AthleteSummaryBasic';
import DeleteAthlete from './components/DeleteAthlete';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UpdateAthlete from './components/UpdateAthlete';
import ViewAthletes from './components/AthleteList';
import ReadAthlete from './components/Readathlete';
import { AthleteFormProvider } from './context/AthleteFormContext';

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/viewathletes', element: <ViewAthletes /> },
    { path: '/athletesummarybasic/:id', element: <AthleteSummaryBasic /> },
    { path: '/deleteathlete/:id', element: <DeleteAthlete /> },
    { path: '/updateathlete/:id', element: <UpdateAthlete /> },
    { path: '/readathlete/:id', element: <ReadAthlete /> },

    {
        path: '/addathlete',
        element: (
            <AthleteFormProvider>

                <AddAthlete />

            </AthleteFormProvider>
        ),
    },
    {
        path: '/addathleteb',
        element: (
            <AthleteFormProvider>

                <AddAthleteb />

            </AthleteFormProvider>
        ),
    },
    {
        path: '/addathletec',
        element: (
            <AthleteFormProvider>

                <AddAthletec />

            </AthleteFormProvider>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
