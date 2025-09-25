/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import SignInForm from './login-form';

const LoginPage = () => {
    // const [password, setPassword] = useState('');
    // const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });


    return (
        <div>
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center min-h-screen p-3">
                    <div className="container-login">
                        <div className="broad-cover">
                        </div>
                        <div className="broad-login" /> 
                    </div>
                    <div className='surface-card w-12 md:w-10 ' style={{ borderRadius: '15px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <div className="surface-card py-3 px-4 sm:px-5" style={{ borderRadius: '15px', }} >
                            <div className="flex flex-column align-items-center mb-1 sm:mb-4">
                                <span className="flex items-center">
                                    <img src="/demo/images/login/789-CFS.png" alt="Image" height="40" className="mr-2" />
                                    <div className="text-3xl sm:text-xl  font-medium " style={{ marginTop: "0.4rem", color: 'var(--primary-color)' }}>789 CFS Check-In</div>
                                </span>
                                <span className="text-600 text-sm font-medium">ລະບົບ ການເຂົ້າ-ອອກວຽກ 789 ຄອນກຣີດ</span>
                            </div>
                            <SignInForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
