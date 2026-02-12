// layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import HomeBtn from '../components/HomeBtn';

function AuthLayout() {
    return (
        <div>
            <HomeBtn />
            <Outlet />
        </div>
    );
}

export default AuthLayout;