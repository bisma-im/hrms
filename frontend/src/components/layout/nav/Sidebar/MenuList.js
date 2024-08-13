// MenuList.js
import { FaHome, FaUsers, FaFileAlt, FaBriefcase, FaRegCalendarCheck, FaPencilAlt, FaRegCalendarMinus, FaUserPlus, FaRegHandshake, FaCog, FaSignOutAlt, FaMoon } from 'react-icons/fa';

const menuItems = [
  { id: 1, icon: FaHome, label: 'Dashboard', link: '/' },
  { id: 2, icon: FaUsers , label: 'Employees', link: '/employees-list' },
  { id: 3, icon: FaRegCalendarCheck, label: 'Attendance', link: '/attendance' },
  { id: 4, icon: FaRegCalendarMinus, label: 'Leaves', link: '/leaves' },
  { id: 5, icon: FaUserPlus, label: 'Recruitment', link: '/recruitment', submenus: [
    { id: 10, icon: FaFileAlt, label: 'Jobs', link: '/job-positions' },
    { id: 11, icon: FaBriefcase, label: 'Applications', link: '/applications-list' },
  ]},
  { id: 6, icon: FaRegHandshake, label: 'Onboarding', link: '/onboarding' },
  { id: 7, icon: FaCog, label: 'Settings', link: '/settings' },
  { id: 8, icon: FaMoon, label: 'Dark Mode', type: 'button', action: 'toggleTheme' },
  // { id: 9, icon: FaSignOutAlt , label: 'Logout', type: 'button', action: 'logout' },
  // { id: 10, icon: FaRegCalendarMinus, label: 'Leaves', link: '/leaves' },
  // { id: 11, icon: FaUserPlus, label: 'Recruitment', link: '/recruitment' },
  // { id: 12, icon: FaRegHandshake, label: 'Onboarding', link: '/onboarding' },
  // { id: 13, icon: FaRegCalendarMinus, label: 'Leaves', link: '/leaves' },
  // { id: 14, icon: FaUserPlus, label: 'Recruitment', link: '/recruitment' },
  // { id: 15, icon: FaRegHandshake, label: 'Onboarding', link: '/onboarding' },
];

export default menuItems;
