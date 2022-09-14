import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import { getItem } from '../utils/storage';
import HomeClients from '../pages/Clients';
import Charges from '../pages/Charges';
import DetailsClients from '../pages/DetailsClients';
import ChargesFilter from '../pages/Charges/ChargesFilter';
import ClientsFilter from '../pages/Clients/ClientsFilter';
import PageNotFound from '../pages/PageNotFound';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}
function UserAuthenticated({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function RoutesApp() {
    return (
        <Routes>
            <Route element={<UserAuthenticated redirectTo={'/home'} />}>
                <Route path='/' element={<SignIn />}>
                    <Route path='/login' element={<SignIn />} />
                </Route>
                <Route path='/cadastrar' element={<SignUp />} />
            </Route>
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<Main />} />
                <Route path='/clients' element={<HomeClients />} />
                <Route path='/clients/:id' element={<DetailsClients />} />
                <Route path='/charges' element={<Charges />} />
                <Route path='/charges/filter/:id' element={<ChargesFilter />} />
                <Route path='/clients/filter/:id' element={<ClientsFilter />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
}

export default RoutesApp;