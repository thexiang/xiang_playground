import React from 'react';

import './Layout.css';

export const Layout = ({ children }) => {
    return (
        <div className='content-layout'>
            <h1>Miya's playground</h1>
            {children}
        </div>
    )
}