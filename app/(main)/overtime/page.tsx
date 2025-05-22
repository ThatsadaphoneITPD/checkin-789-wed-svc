'use client';
import React from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';

const Overtime = () => {

    const router = useRouter();

    return (
        <div className="grid justify-content-center align-items-center">
            <div className="col-12 text-900">
                <div className="card">
                    <div className="grid">
                        <div className="col-5 flex align-items-center justify-content-center">
                            <div className="p-fluid">
                                <Button onClick={() => { router.push('/overtime/weekday') }} className={classNames(styles['p-button'], styles['overtimeweekday'])} aria-label="Google">
                                    <span className="flex align-items-center px-2 text-white" style={{ backgroundColor: '#52c41a' }}>
                                        <i className="pi pi-clock"></i>
                                    </span>
                                    <span className="px-3 py-2 flex align-items-center text-white">ວັນລັດທະກອນ</span>
                                </Button>
                            </div>
                        </div>
                        <div className="col-1">
                            <Divider layout="vertical">
                                <b>ຫຼື</b>
                            </Divider>
                        </div>
                        <div className="col-5 flex align-items-center justify-content-center">
                            <div className="p-fluid">
                                <Button onClick={() => { router.push('/overtime/weekend') }} className={classNames(styles['p-button'], styles['overtimeweekend'])} aria-label="Twitter">
                                    <span className="flex align-items-center px-2 text-white" style={{ backgroundColor: '#2f54eb' }}>
                                        <i className="pi pi-stopwatch"></i>
                                    </span>
                                    <span className="px-3 py-2 flex align-items-center text-white">ວັນພັກລັດທະກອນ</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Overtime;
