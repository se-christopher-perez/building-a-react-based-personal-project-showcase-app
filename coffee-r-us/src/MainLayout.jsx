import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function MainLayout({ coffees, setCoffees }) {

    return (
        <div className="main-container">

            <NavBar />

            <Outlet context={{ coffees, setCoffees }} />

        </div>
    );
}

export default MainLayout