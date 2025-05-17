import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full bg-[#260058] text-white p-4">
                <nav>
                    <ul className="flex gap-6">
                        <li><Link to="/" className="uppercase hover:underline">Employee List</Link></li>
                        <li><Link to="/add-employee" className="uppercase hover:underline">Add Employee</Link></li>
                        <li><Link to="/departments" className="uppercase hover:underline">Departments</Link></li>
                        <li><Link to="/roles" className="uppercase hover:underline">Roles</Link></li>
                        <li><Link to="/login" className="uppercase hover:underline">Login</Link></li> {/* Add Login link */}
                    </ul>
                </nav>
            </header>

            <main className="flex-grow p-4">
                <Outlet />
            </main>

            <footer className="w-full bg-[#260058] text-white text-center p-4">
                <p>All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default MainLayout;