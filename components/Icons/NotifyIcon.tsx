import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
// const fetchNotifications = async () => {
//   try {
//     const response = await fetch('/api/notifications'); // Đường dẫn API của máy chủ để lấy thông báo
//     if (!response.ok) {
//       throw new Error('Failed to fetch notifications');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// const [notifications, setNotifications] = useState([]);
// useEffect(() => {
//   fetchNotifications().then((data) => {
//     setNotifications(data);
//   });
// }, []);

const notifications = [
  { id: 1, message: 'Notification 1' },
  { id: 2, message: 'Notification 2' },
];

const NotifyIcon = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [open, setOpen] = useState(false);

  const notiRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notiRef.current &&
        event.target &&
        (event.target as HTMLElement).id !== "notiRefButton"
      ) {
        setOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notiRef]);
  return (
    <div className="z-40 pl-2 mr-1">
    <motion.div animate={open ? "open" : "closed"} className="relative">   
      <button
        id="notiRefButton" ref={notiRef}
        className="rounded-full focus:outline-none p-1.5 m-0.5 bg-red-600 hover:bg-red-700 relative"
        onClick={() => setOpen((pv) => !pv)}
      >
        <div className="w-full h-full bg-transparent absolute" id="notiRefButton" ref={notiRef}></div>
        <svg
          width="24"
          height="24"
          strokeWidth="2.0"
          viewBox="0 0 24 24"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949"
            stroke="white" strokeLinecap="round"
            strokeLinejoin="round" />
          <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
            stroke="yellow" strokeLinecap="round" fill="yellow"
            strokeLinejoin="round" />
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke="white" strokeLinecap="round" fill="#ffffff"
            strokeLinejoin="round" />
        </svg>
      </button>
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col p-2 rounded-lg bg-white shadow-xl absolute top-[120%] md:-right-20 w-40 overflow-hidden"
        >
              {notifications.map((notification) => (
                <div key={notification.id}>
                <Option text={notification.message} />
                </div>
              ))}
        </motion.ul>
    </motion.div>
    </div>
  );
};
const Option = ({ text}) => {
  return (
    <motion.li
      variants={itemVariants}
      className="flex z-50 items-center p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <span>{text}</span>
    </motion.li>
  );
};

export default NotifyIcon;
const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: 0,
    transition: {
      when: "afterChildren",
    },
  },
};