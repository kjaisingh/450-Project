import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Find An Airbnb',
    path: '/find',
    icon: <FaIcons.FaAirbnb />,
    cName: 'nav-text'
  },
  {
    title: 'Experience NYC',
    path: '/nycparty',
    icon: <FaIcons.FaGlassCheers />,
    cName: 'nav-text'
  },
];