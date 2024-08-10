import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav, Navbar, Accordion } from 'react-bootstrap';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSignOutAlt, FaCaretRight, FaCaretDown } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IconContext } from 'react-icons';
import { toggleSidebar } from 'features/nav/sidebarSlice';
import menuItems from 'components/layout/nav/Sidebar/MenuList';
import { LinkContainer } from 'react-router-bootstrap';
import './Sidebar.css';
import { useAppContext } from 'context/AppContext';
import { useTheme } from 'context/ThemeContext';
import { logout } from 'features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const collapsed = useSelector(state => !state.sidebar.sidebarOpen);
  // const { logout } = useAppContext();
  const { theme, toggleTheme } =useTheme();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const dispatch = useDispatch();

  function onLogout(){
        dispatch(logout());
    }
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // const handleToggleTheme = () => {
  //   dispatch(toggleTheme());
  // };

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
      <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
        <div className="sidebar-toggle" onClick={handleToggleSidebar}>
            {collapsed ? <FaAngleDoubleRight className='arrow' /> : <FaAngleDoubleLeft className='arrow'/>}
          </div>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{ height: 'calc(100vh - 10px)' }}
          renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{ ...style, backgroundColor: '#ccd9f1', borderRadius: '6px' }} />
          }
        >
        <Nav defaultActiveKey="/home" className="flex-column">
          {menuItems.map(item => (
            item.action === 'toggleTheme' ?
              <Nav.Link onClick={toggleTheme} className="sidebar-item" key={item.id}>
                  <item.icon className='icon' />
                  {!collapsed && <span className='text'>{theme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
              </Nav.Link>
            : (
              <React.Fragment key={item.id}>
              {item.submenus ? (
                <>
                  <div className="sidebar-item nav-link" onClick={() => toggleSubmenu(item.id)}>
                    <item.icon className='icon' />
                    {!collapsed && 
                      <span className='text'>{item.label}
                        {openSubmenu ? <FaCaretRight className='fa-caret'/> : <FaCaretDown className='fa-caret'/>}
                      </span>}
                  </div>
                  {openSubmenu === item.id && (
                    <div className="">
                      {item.submenus.map(sub => (
                        <LinkContainer to={sub.link} key={sub.id}>
                          <Nav.Link className="sub-item">
                            <sub.icon className='icon' />
                            {!collapsed && <span className='text'>{sub.label}</span>}
                          </Nav.Link>
                        </LinkContainer>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <LinkContainer to={item.link} key={item.id}>
                  <Nav.Link className="sidebar-item">
                    <item.icon className='icon' />
                    {!collapsed && <span className='text'>{item.label}</span>}
                  </Nav.Link>
                </LinkContainer>
              )}
              
            </React.Fragment>
            )
          ))}
            <Nav.Link className="sidebar-item" onClick={onLogout}>
              <FaSignOutAlt className='icon' />
              {!collapsed && <span className='text'>Logout</span>}
            </Nav.Link>
          </Nav>
        </Scrollbars>

      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
