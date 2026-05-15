import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function MainLayout({ coffees, stores }) {

    return (
        <div className="main-container">

            <NavBar />

            <Outlet context={{ coffees, stores }} />

        </div>
    );
}

export default MainLayout