'use client';
import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useOutSideWorkStore, authenStore } from '@/app/store';
import toast from 'react-hot-toast';
import { Button } from 'primereact/button';
import { Form } from '@/app/components/ui/form';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { Checkin } from '@/types';
import RocketFlamingIcon from '@/app/components/icons/rocket-flaming';
// import GlobalPhotoView from '@/app/shared/photo-view/container';
// import GoogleMapShow from '@/app/shared/google-map/displaymap';
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CreateMobileUserkInput, createMobileUser } from '@/utils/validators/create-mobile-user.schema';
import { InputText } from 'primereact/inputtext';

interface CreateMobileUserProps {
    rowItem: Checkin.MobileUser;
}


export default function Create({ rowItem }: CreateMobileUserProps) {
  const [lang, setLang] = useState("LA");
  const [reset, setReset] = useState({});
  const {approveOutSideWork }= useOutSideWorkStore()
  const {authData} = authenStore();
  // 1 GB = 1 * 10^9 bytes // or 2 GB = 2 * 10^9 bytes
//   const Gigabytes = 1 * (10 ** 9);
  const [openModal, setopenModal] = useState(false)
  const handOpen = () => { setopenModal(true) }
  const handClose = () => { setopenModal(false) }

  const onSubmit: SubmitHandler<CreateMobileUserkInput> = async (data) => {
    try {
      const formattedData = {
        ...data,
      };
      console.log("formattedData", formattedData)
      // Create a new FormData object
      const formData = new FormData();
    
      // Append each field to the FormData object
      Object.entries(formattedData).forEach(([key, value]) => {
        formData.append(key, value as string); // Convert to string if necessary
      });
  
      // approveOutSideWork(formData).then((res: any)=>{ console.log("res", res) 
      //   if(res?.status == 201) {
      //     if (res.approvething == "Approved") {
      //       handClose();
      //       toast.success(res.sms)
      //     }else if (res.approvething == "Rejected") {
      //       handClose();
      //       toast(
      //         `ໄດ້ປະຕິເສດ ການອອກວຽກນອກ ເລກທີ ${rowItem?.user_id}`, { icon: <RocketFlamingIcon style={{width: "1.5rem", height: "1.5rem"}}/>, style: { border: '1px solid #FFA500', color: '#333', background: '#FFFAE5',  },  duration: 5000, }
      //       );
      //     }
      //   }else { toast.error(res.sms)}
      // })
      // setReset({});
      console.log("sendAPI", formData);
    } catch (err: any) {
      console.log("errAPI", err.message);
    }
    // closeModal();
  };
  // const taggle =()=> {
  //   setLang("")
  // }
const fieldStatus = {
    Approved : { status: 'Approved', l_status: 'ອະນຸມັດ' },
    Rejected: { status: 'Rejected', l_status: 'ບໍ່ອະນຸມັດ' },
} as const;

const fieldstatus = Object.entries(fieldStatus).map(([key, value]) => ({
    name: value.status,
    la: value.l_status,
    value: key
}));


 const FormCreate = (
    <Form<CreateMobileUserkInput> id="createExportForm" resetValues={reset} validationSchema={createMobileUser} onSubmit={onSubmit} className="p-fluid"
        useFormProps={{
            defaultValues: {
                ful_name: rowItem?.fullname,
                comments: "",
            },
        }}
        >
      {({ register, control, watch, formState: { errors } }) => {
        console.log("err", errors)
        // const watchto_md = watch("to_md");
        // console.log("watchat_files", watchat_files)
        const urltest = 'https://res.cloudinary.com/dp3zeejct/image/upload/v1655344187/cld-sample-2.jpg'
        return (
          <>
            <div key="approvedBy" className="field" style={{ marginTop: "1.6rem" }}>
              <span className="contentfloat" style={{ width: "100%" }}>
                 <InputText {...register("ful_name")} />
                <label htmlFor="content" >{lang === "LA" ? "ຊື່ ແລະ ນາມສະກຸນ" : "Content"} <span className='required-star' >*</span></label>
              </span>
            </div>
          </>
        );
      }}
    </Form>
  );

  const DialogFooter = (
    <>
      <Button label="ບັນທຶກ" icon="pi pi-check" form="createExportForm" type="submit" />
    </>
  );
  const header = (<div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#2684FF" }}><div>ຂໍ້ມູນ ຜູ້ໃຊ້ ({rowItem?.emp_code})</div></div>)

  return (
    <>
      <Dialog visible={openModal} header={header} footer={DialogFooter} onHide={handClose} style={{ width: "600px", padding: "none", marginBottom: "none" }} modal className={`modal-form `}>
        {FormCreate}
      </Dialog>
      <button  className="button custom-target-des" data-pr-tooltip="ຈຸດເຂົ້າວຽກ" onClick={() =>  handOpen()}>
          <LiaMapMarkedAltSolid size={20}/>
      </button>
    </>
  );
}
