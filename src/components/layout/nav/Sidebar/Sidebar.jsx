import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaMoon } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IconContext } from 'react-icons';
import { toggleSidebar } from 'features/nav/sidebarSlice';
import menuItems from 'components/layout/nav/Sidebar/MenuList';
import { LinkContainer } from 'react-router-bootstrap';
import './Sidebar.css';
import { toggleTheme } from 'features/theme/themeSlice';

const Sidebar = () => {
  const collapsed = useSelector(state => !state.sidebar.sidebarOpen);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  }

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
            item.type === 'button' ?
            <Nav.Link onClick={handleToggleTheme} key={item.id} className="sidebar-item">
                <item.icon className='icon' />
                {!collapsed && <span className='text'>{theme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
            </Nav.Link> :
            <LinkContainer to={item.link} key={item.id} className="sidebar-item">
              <Nav.Link>
                <item.icon className='icon' />
                {!collapsed && <span className='text'>{item.label}</span>}
              </Nav.Link>
            </LinkContainer>
          ))}
        </Nav>
        {/* <Button onClick={handleToggleTheme} className="sidebar-item">
          <FaMoon className='icon'/>
           {!collapsed && <span className='text'>Dark Mode</span>}
        </Button> */}
        </Scrollbars>

      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;


