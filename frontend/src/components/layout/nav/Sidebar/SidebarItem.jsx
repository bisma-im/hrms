import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {FaCaretRight, FaCaretDown } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';

const SidebarItem = ({ item, toggleTheme, collapsed, toggleSubmenu, openSubmenu }) => {
    if (item.action === 'toggleTheme') {
      return (
        <Nav.Link onClick={toggleTheme} className="sidebar-item">
          <item.icon className='icon' />
          {!collapsed && <span className='text'>{item.label}</span>}
        </Nav.Link>
      );
    }
  
    return (
      <React.Fragment>
        {item.submenus ? (
          <div>
            <div className="sidebar-item nav-link" onClick={() => toggleSubmenu(item.id)}>
              <item.icon className='icon' />
              {!collapsed && 
                <span className='text'>{item.label}
                  {openSubmenu ? <FaCaretDown className='fa-caret'/> : <FaCaretRight className='fa-caret'/>}
                </span>}
            </div>
            
            <div className={`submenu-container ${openSubmenu ? 'open' : ''}`}>
                {openSubmenu && item.submenus.map(sub => (
                <LinkContainer to={sub.link} key={sub.id}>
                    <Nav.Link className="sub-item">
                    <sub.icon className='icon' />
                    {!collapsed && <span className='text'>{sub.label}</span>}
                    </Nav.Link>
                </LinkContainer>
                ))}
            </div>
          </div>
        ) : (
          <LinkContainer to={item.link}>
            <Nav.Link className="sidebar-item">
              <item.icon className='icon' />
              {!collapsed && <span className='text'>{item.label}</span>}
            </Nav.Link>
          </LinkContainer>
        )}
      </React.Fragment>
    );
  };

export default SidebarItem;