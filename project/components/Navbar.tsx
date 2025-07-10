
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS, SITE_TITLE } from '../constants';
import { AcademicCapIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from './icons';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error display if needed
    }
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex flex-col sm:flex-row justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2 mb-2 sm:mb-0">
          <AcademicCapIcon className="w-8 h-8 text-yellow-400" />
          <h1 className="text-xl font-bold hover:text-blue-200 transition-colors">{SITE_TITLE}</h1>
        </NavLink>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <ul className="flex flex-wrap justify-center sm:justify-end space-x-1 sm:space-x-2">
            {NAV_LINKS.map((link) => {
              const IconComponent = link.icon;
              if (link.showAlways) {
                return (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive ? 'bg-blue-800 text-yellow-300' : 'hover:bg-blue-600 hover:text-blue-100'
                        }`
                      }
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 mr-1.5" />}
                      {link.name}
                    </NavLink>
                  </li>
                );
              }
              if (currentUser && link.showWhenLoggedIn) {
                 return (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive ? 'bg-blue-800 text-yellow-300' : 'hover:bg-blue-600 hover:text-blue-100'
                        }`
                      }
                    >
                       {IconComponent && <IconComponent className="w-4 h-4 mr-1.5" />}
                      {link.name}
                    </NavLink>
                  </li>
                );
              }
              if (currentUser && link.adminOnly && currentUser.role === 'admin') {
                return (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive ? 'bg-blue-800 text-yellow-300' : 'hover:bg-blue-600 hover:text-blue-100'
                        }`
                      }
                    >
                       {IconComponent && <IconComponent className="w-4 h-4 mr-1.5" />}
                      {link.name}
                    </NavLink>
                  </li>
                );
              }
              if (!currentUser && link.showWhenLoggedOut) {
                 return (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive ? 'bg-blue-800 text-yellow-300' : 'hover:bg-blue-600 hover:text-blue-100'
                        }`
                      }
                    >
                       {IconComponent && <IconComponent className="w-4 h-4 mr-1.5" />}
                      {link.name}
                    </NavLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
          {currentUser && (
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <span className="text-sm text-blue-200 flex items-center">
                <UserCircleIcon className="w-5 h-5 mr-1 text-yellow-300" />
                {currentUser.username} ({currentUser.role})
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 transition-colors text-white"
                aria-label="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-1.5" />
                登出
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
