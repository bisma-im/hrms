import { FaHome, FaUsers, FaFileAlt, FaBriefcase, FaRegCalendarCheck, FaRegCalendarMinus, FaUserPlus, FaRegHandshake, FaCog, FaMoon, FaExclamationCircle, FaMedkit, FaUmbrellaBeach, FaAward, FaFileUpload } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const useMenuItems = () => {
  const { user } = useSelector(state => state.auth);

  if (user.role === 'Admin') {
    return [
      { id: 1, icon: FaHome, label: 'Dashboard', link: '/' },
      { id: 2, icon: FaUsers, label: 'Employees', link: '/employees-list' },
      { id: 3, icon: FaRegCalendarCheck, label: 'Attendance', link: '/attendance' },
      { id: 4, icon: FaRegCalendarMinus, label: 'Leaves', link: '/leaves' },
      {
        id: 5, icon: FaUserPlus, label: 'Recruitment', link: '/recruitment', submenus: [
          { id: 10, icon: FaFileAlt, label: 'Jobs', link: '/job-positions' },
          { id: 11, icon: FaBriefcase, label: 'Applications', link: '/applicants' },
        ]
      },
      { id: 6, icon: FaRegHandshake, label: 'Onboarding', link: '/onboarding' },
      { id: 7, icon: FaCog, label: 'Settings', link: '/settings' },
      { id: 8, icon: FaMoon, label: 'Dark Mode', type: 'button', action: 'toggleTheme' },
    ];
  } 
  else if (user.role === 'employee') {
    return [
      { id: 1, icon: FaHome, label: 'Dashboard', link: '/' },
      { id: 2, icon: FaExclamationCircle, label: 'Complaints', link: '/' },
      { id: 3, icon: FaRegCalendarMinus, label: 'Leaves', link: '/leaves', submenus: [
          { id: 4, icon: FaMedkit, label: 'Sick Leave', link: '/sick-leave' },
          { id: 5, icon: FaUmbrellaBeach, label: 'Casual Leave', link: '/casual-leave' },
          { id: 6, icon: FaAward, label: 'Privilege Leave', link: '/privilege-leave' },
        ] 
      },
      { id: 7, icon: FaFileUpload, label: 'Documents', link: '/documents' },
      { id: 8, icon: FaCog, label: 'Settings', link: '/settings' },
      { id: 9, icon: FaMoon, label: 'Dark Mode', type: 'button', action: 'toggleTheme' },
    ];
  }

  return [];
};

export default useMenuItems;
