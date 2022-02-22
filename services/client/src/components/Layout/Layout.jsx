import React from 'react';

import './Layout.css';

export const Layout = ({ children }) => {
    return (
        <div className='content-layout'>{children}</div>
    )
}