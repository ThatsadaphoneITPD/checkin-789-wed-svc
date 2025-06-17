'use client';
import {authenStore} from '@/app/store';
import React, { useContext, useEffect, useState } from 'react';

const ProfileUser = () => {
    const { authData } = authenStore();
    return (
            <div className='flex flex-column align-items-center justify-content-center' style={{width: "12rem", borderRadius: "1rem",  display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}}>
                <div className="grid justify-content-center text-center">
                    <div className="col-12 flex justify-content-center" style={{margin: "-6rem"}}>
                        <div style={{  height: "9rem",   width: "9rem",   borderRadius: "0.8rem",   transform: "rotate(45deg)",    display: "flex",    alignItems: "center",    justifyContent: "center",   overflow: "hidden", background: "linear-gradient(90deg, rgba(245,255,23,1) 0%, rgba(244,250,35,1) 41%, rgba(226,238,64,1) 100%)", padding: "5px"  }} >
                            <div style={{  height: "2rem", width: "2rem", background: "white", borderRadius: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} />
                        </div>
                    </div>
                    <div className="col-12 flex justify-content-center -mt-3">
                        <div style={{  height: "7.5rem",   width: "7.5rem",   borderRadius: "1.5rem",   transform: "rotate(45deg)",    display: "flex",    alignItems: "center",    justifyContent: "center",   overflow: "hidden",   background: "linear-gradient(90deg, rgba(48,42,157,1) 0%, rgba(28,28,140,1) 41%, rgba(84,84,235,1) 100%)", padding: "5px"  }} >
                            <div style={{  height: "6.8rem", width: "7rem", background: "white", borderRadius: "1.7rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} >
                                <img src={`/layout/images/testProfile.png`} alt="logo"  style={{ height: "9rem", width: "8rem", margin: "2rem 0 0 2rem",  transform: "rotate(-42deg)", objectFit: "cover"}}/>
                            </div>
                        </div>
                    </div>
                    <div className="grid justify-content-center text-center">
                        <div style={{marginLeft: "-4rem", marginRight: "4rem", marginTop: "-3.5rem"}}>
                            <div style={{  height: "6rem",   width: "6rem",   borderRadius: "0.9rem",   transform: "rotate(45deg)",    display: "flex",    alignItems: "center",    justifyContent: "center",   overflow: "hidden",   background: "linear-gradient(90deg, rgba(48,42,157,1) 0%, rgba(28,28,140,1) 41%, rgba(84,84,235,1) 100%)", padding: "5px"  }} >
                                <div style={{  height: "4.5rem", width: "4.5rem", background: "white", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} />
                            </div>
                        </div>
                        <div style={{marginLeft: "4rem", marginRight: "-4rem", marginTop: "-3.5rem"}}>
                            <div style={{  height: "6rem",   width: "6rem",   borderRadius: "0.8rem",   transform: "rotate(45deg)",    display: "flex",    alignItems: "center",    justifyContent: "center",   overflow: "hidden",   background: "linear-gradient(90deg, rgba(48,42,157,1) 0%, rgba(28,28,140,1) 41%, rgba(84,84,235,1) 100%)", padding: "5px"  }} >
                                <div style={{  height: "4.5rem", width: "4.5rem", background: "white", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-column align-items-center justify-content-center'>
                    <div className="flex flex-column align" style={{ color: "#2f54eb" }}>
                        <div className="grid grid-nogutter justify-content-center text-center">
                            <span className='col-12' style={{fontSize: "0.7rem"}}>{authData != null ? `${authData?.fullname != null ? authData?.fullname : ""}` : "---"}</span>
                            <span className='col-12' style={{fontSize: "0.6rem"}} >{authData != null ? `${authData.position_name } [${authData.role}]` : ""}</span>
                        </div>
                        <div className="grid grid-nogutter">
                            <div className="col-3 " >
                                <div style={{fontSize: "0.6rem"}}  className="text-right">ລະຫັດ:</div>
                            </div>
                            <div className="col-6 col-offset-1">
                                <div style={{fontSize: "0.6rem"}} className="text-left">{authData != null ? authData?.username : "---"}</div>
                            </div>
                            <div className="col-3">
                                <div style={{fontSize: "0.6rem"}} className="text-right">ສັງກັດ:</div>
                            </div>
                            <div className="col-6 col-offset-1">
                                <div style={{fontSize: "0.6rem"}} className="text-left">{authData != null ? authData.department_name : "---"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ProfileUser;
