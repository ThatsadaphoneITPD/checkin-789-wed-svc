/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from 'primereact/button';

const AccessDeniedPage = () => {
     const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('eoffice_token');
        localStorage.removeItem('authStore');
        localStorage.removeItem('sideMenu');
        // localStorage.removeItem('ally-supports-cache');
        document.cookie = 'token=; authStore=; sideMenu=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.replace('/auth/login');

    };

    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <img src="/demo/images/login/checkin.png" alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                        {/* <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                            <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                        </div> */}
                        <h1 className="text-900 font-bold text-5xl mb-2">ປະຕິເສດ ການເຂົ້າເຖິ່ງ</h1>
                        <div className="text-600 mb-5">ທ່ານ ບໍ່ມີສິດ ອະນຸຍາດ ຈຳເປັນໃນການເຂົ້າເຖິ່ງ</div>
                        <img src="/demo/images/access/asset-access.svg" alt="Error" className="mb-5" width="80%" />
                        <div className="flex gap-3 justify-content-center">
                            <Button icon="pi pi-arrow-left" label="ກັບໄປ ໜ້າຫຼັກ" text onClick={() => router.push('/')} />
                            <Button icon="pi pi-sign-out" label="LogIn ເຂົ້າໃໝ່" text onClick={() => handleLogout()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessDeniedPage;
