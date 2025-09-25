/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer" style={{color: "#81901e"}}>
            <img src={`/layout/images/edl_logo.svg`} alt="Logo" height="27" className="mr-2" />
            by
            <span className="font-medium ml-2" > Application Division</span>
        </div>
    );
};

export default AppFooter;
