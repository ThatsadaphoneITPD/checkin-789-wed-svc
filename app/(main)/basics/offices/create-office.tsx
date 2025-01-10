'use client';
import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Form } from '@/app/components/ui/form';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { CreateOfficeInput, createOfficeSchema } from '@/utils/validators/create-office.schema';
import { PiBuildingOfficeFill } from "react-icons/pi";

export default function CreateOffice(defaultdata: any) {
  const [lang, setLang] = useState("LA");
  const [reset, setReset] = useState({});
  const [openModal, setopenModal] = useState(false)
  const handOpen = () => { setopenModal(true) }
  const handClose = () => { setopenModal(false) }
  const onSubmit: SubmitHandler<CreateOfficeInput> = async (data) => {
    try {
      const formattedData = {
        ...data,
      };
      if (defaultdata?.data){
        //Edit
        console.log("Edit", formattedData);
        setReset({})
      } 
      else 
      {
        //Create
        console.log("Create", formattedData);
        setReset({})
      }
    } catch (err: any) {
      console.log("errAPI", err.message);
    }
  };


  const FormCreate = (
    <Form<CreateOfficeInput> id="createExportForm" resetValues={reset} validationSchema={createOfficeSchema} onSubmit={onSubmit} className="p-fluid" >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div key="ex_code" className="field" style={{ marginTop: "1rem" }}>
              <span className="contentfloat" style={{ width: "100%" }} >
                <InputText className='p-fill' {...register("name")} defaultValue={defaultdata?.data?.name} />
                <label htmlFor="ex_code" >ຊື່ ຫ້ອງການ-ສູນບໍລິການ <span className='required-star' >*</span></label>
              </span>
              {errors?.name?.message && <small className="p-invalid required-star">ປ້ອນ ເລກທີ ດ້ວຍ</small>}
            </div>
          </>
        );
      }}
    </Form>
  );

  const DialogFooter = (
    <>
      <Button label="ຍົກເລີກ" icon="pi pi-times" text onClick={handClose} />
      <Button label={defaultdata?.data ? "ແກ້ໄຂ" : "ສ້າງ"} icon="pi pi-check" form="createExportForm" type="submit" />
    </>
  );
  const header = (<div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#2684FF" }}><div>ສ້າງຂາເຂົ້າພາຍນອກ</div></div>)

  return (
    <>
      <Dialog visible={openModal} header={header} footer={DialogFooter} onHide={handClose} style={{ width: "600px", padding: "none", marginBottom: "none" }} modal className={`modal-form `}>
        {FormCreate}
      </Dialog>
      <div className="icon-react">
        <PiBuildingOfficeFill className="with-hover" onClick={handOpen}/>
      </div>
      {/* <Button icon="pi pi-pencil" rounded text raised severity="secondary" className="p-button-rounded" onClick={handOpen} /> */}
    </>
  );
}
