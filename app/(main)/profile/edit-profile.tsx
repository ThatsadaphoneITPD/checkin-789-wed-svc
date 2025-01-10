'use client';
import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { CreateProfileInput, createProfileSchema } from "./schema-validation/create-profile.schema";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Form } from '@/app/components/ui/form';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { mds, positions } from './schema-validation/contant-type.data';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export default function CreateUserProfile(profiledata: any) {
  const [lang, setLang] = useState("LA");
  // 1 GB = 1 * 10^9 bytes // or 2 GB = 2 * 10^9 bytes
  const [reset, setReset] = useState({});
  const [openEdit, setEdit] = useState(true)
  const handOpen = () => { setEdit(false) }
  const handClose = () => { setEdit(true) }

  const onSubmit: SubmitHandler<CreateProfileInput> = async (data) => {
    try {
      const formattedData = {
        ...data,
      };
      setReset({})
      setEdit(true)
      console.log("sendAPI", formattedData);
    } catch (err: any) {
      console.log("errAPI", err.message);
    }
  };


  const FormCreate = (
    <Form<CreateProfileInput> id="createExportForm" resetValues={reset} validationSchema={createProfileSchema} onSubmit={onSubmit} className={`p-fluid ${profiledata?.className}`} >
      {({ register, control, watch, formState: { errors } }) => {
        console.log("err", errors)
        const basiceInfo = (
          <div className='card'>
            <label htmlFor="attachment_files" className='mt-2' style={{ color: "#2684FF", fontWeight: "bold" }}>{lang === "LA" ? "ຂໍ້ມູນພະນັກງານ" : "Contract Info"}</label>
            <div key="empoyee_code" className="field">
              <Controller name="empoyee_code" control={control}
                render={({ field: { name, value, onChange } }) => (
                  <span className="contentfloat" style={{ width: "100%", marginTop: "1rem" }} >
                    <InputNumber disabled className='p-fill' id={name} value={value ? value : 0} useGrouping={false} onValueChange={onChange} />
                    <label htmlFor={name} >ລະຫັດ ຟຟລ</label>
                  </span>
                )} />
              {errors?.empoyee_code?.message && <small className="p-invalid required-star">ກະລຸນາ ປ້ອນ ຫົວຂໍ້</small>}
            </div>
            <div key="frist_name" className="field">
              <span className="contentfloat" style={{ width: "100%", marginTop: "1rem" }}>
                <InputText disabled={openEdit} {...register("frist_name")} placeholder="" className="input-text" />
                <label htmlFor="frist_name" >{lang === "LA" ? " ຊື່ພະນັກງານ" : "Frist Name"} <span className='required-star' >*</span></label>
              </span>
              {errors?.frist_name?.message && <small className="p-invalid required-star">ກະລຸນາ ປ້ອນ ຊື່</small>}
            </div>
            <div key="last_name" className="field">
              <span className="contentfloat" style={{ width: "100%", marginTop: "1rem" }}>
                <InputText disabled={openEdit} {...register("last_name")} placeholder="" className="input-text" />
                <label htmlFor="last_name" >{lang === "LA" ? "ນາມສະກຸນ" : "last Name"} <span className='required-star' >*</span></label>
              </span>
              {errors?.last_name?.message && <small className="p-invalid required-star">ກະລຸນາ ປ້ອນ ນາມສະກຸນ</small>}
            </div>
            <div key="postion" className="field">
              <Controller key="postion" name="postion" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="float eoffice-float-label" style={{ width: "100%" }}>
                  <Dropdown disabled={openEdit} inputId={name} value={value} onChange={onChange} options={positions} optionValue='value'
                    className="w-full" optionLabel={lang === "LA" ? "la" : "name"} />
                  <label htmlFor={name} >{lang === "LA" ? "ຕຳແໜ່ງ" : "Position"} <span className='required-star' >*</span></label>
                </span>
              )} />
              {errors?.postion?.message && <small className="p-invalid required-star">ເລືອກ ຕຳແໜ່ງ</small>}
            </div>
          </div>)
        const currentDepartment = (
          <div className='card'>
            <label htmlFor="attachment_files" className='mt-2' style={{ color: "#2684FF", fontWeight: "bold" }}>{lang === "LA" ? "ສັງກັດ-ບ່ອນປະຈຳການ" : "Contract Info"}</label>
            <div key="department" className="field">
              <Controller key="department" name="department" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="float eoffice-float-label" style={{ width: "100%", marginTop: "1rem" }}>
                  <Dropdown disabled={openEdit} inputId={name} value={value} onChange={onChange} options={positions} optionValue='value'
                    className="w-full" optionLabel={lang === "LA" ? "la" : "name"} />
                  <label htmlFor={name} >{lang === "LA" ? "ຝ່າຍ/ຫ້ອງການ ຟຟລ/ສະຖະບັນ" : "Position"} <span className='required-star' >*</span></label>
                </span>
              )} />
              {errors?.department?.message && <small className="p-invalid required-star">ເລືອກ ຝ່າຍ/ຫ້ອງການ ຟຟລ/ສະຖະບັນ</small>}
            </div>
            <div key="division" className="field">
              <Controller key="division" name="division" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="float eoffice-float-label" style={{ width: "100%" }}>
                  <Dropdown disabled={openEdit} inputId={name} value={value} onChange={onChange} options={positions} optionValue='value'
                    className="w-full" optionLabel={lang === "LA" ? "la" : "name"} />
                  <label htmlFor={name} >{lang === "LA" ? "ພະແນກ/ສາຂາ/ສູນ" : "Position"} <span className='required-star' >*</span></label>
                </span>
              )} />
              {errors?.division?.message && <small className="p-invalid required-star">ເລືອກ ພະແນກ/ສາຂາ/ສູນ</small>}
            </div>
            <div key="center_service_unit" className="field">
              <Controller key="center_service_unit" name="center_service_unit" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="float eoffice-float-label" style={{ width: "100%" }}>
                  <Dropdown disabled={openEdit} inputId={name} value={value} onChange={onChange} options={positions} optionValue='value'
                    className="w-full" optionLabel={lang === "LA" ? "la" : "name"} />
                  <label htmlFor={name} >{lang === "LA" ? "ຫ້ອງການ/ສູນ" : "Position"} <span className='required-star' >*</span></label>
                </span>
              )} />
              {errors?.center_service_unit?.message && <small className="p-invalid required-star">ເລືອກ ຫ້ອງການ/ສູນ</small>}
            </div>
            <div key="unit" className="field">
              <Controller key="unit" name="unit" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="float eoffice-float-label" style={{ width: "100%" }}>
                  <Dropdown disabled={openEdit} inputId={name} value={value} onChange={onChange} options={positions} optionValue='value'
                    className="w-full" optionLabel={lang === "LA" ? "la" : "name"} />
                  <label htmlFor={name} >{lang === "LA" ? "ຫ່ວຍງານ" : "Position"} <span className='required-star' >*</span></label>
                </span>
              )} />
              {errors?.unit?.message && <small className="p-invalid required-star">ເລືອກ ຫ່ວຍງານ</small>}
            </div>

          </div>
        )
        const deputies = (
          <div className='card' style={{ height: "24rem" }}>
            <label htmlFor="attachment_files" className='mt-2' style={{ color: "#2684FF", fontWeight: "bold" }}>{lang === "LA" ? "ຄະນະຊີ້ນຳ" : "Leader command"}</label>
            <div className="field" style={{ marginTop: "1rem", }}>
              <Controller key="deputy_one" name="deputy_one" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="contentfloat" style={{ width: "100%", }}>
                  <Dropdown disabled={openEdit} showClear id={name} options={mds} value={value} onChange={(e) => { onChange(e.value) }}
                    optionLabel="ful_name" optionValue="emp_id" placeholder="ເລືອກ ທ່ານ ຜອ" />
                  <label htmlFor={name}>ຄະນະ 1</label>
                </span>)} />
              {errors?.deputy_one?.message && <small className="p-invalid required-star">ເລືອກ ຄະນະ ດ້ວຍ</small>}
            </div>
            <div className="field" >
              <Controller key="deputy_two" name="deputy_two" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="contentfloat" style={{ width: "100%", }}>
                  <Dropdown disabled={openEdit} showClear id={name} options={mds} value={value} onChange={(e) => { onChange(e.value) }}
                    optionLabel="ful_name" optionValue="emp_id" placeholder="ເລືອກ ທ່ານ ຜອ" />
                  <label htmlFor={name}>ຄະນະ 2</label>
                </span>)} />
              {errors?.deputy_two?.message && <small className="p-invalid required-star">ເລືອກ ຄະນະ ດ້ວຍ</small>}
            </div>
            <div className="field" >
              <Controller key="deputy_three" name="deputy_three" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="contentfloat" style={{ width: "100%", }}>
                  <Dropdown disabled={openEdit} showClear id={name} options={mds} value={value} onChange={(e) => { onChange(e.value) }}
                    optionLabel="ful_name" optionValue="emp_id" placeholder="ເລືອກ ທ່ານ ຜອ" />
                  <label htmlFor={name}>ຄະນະ 3</label>
                </span>)} />
              {errors?.deputy_three?.message && <small className="p-invalid required-star">ເລືອກ ຄະນະ ດ້ວຍ</small>}
            </div>
            <div className="field" >
              <Controller key="deputy_four" name="deputy_four" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="contentfloat" style={{ width: "100%", }}>
                  <Dropdown disabled={openEdit} showClear id={name} options={mds} value={value} onChange={(e) => { onChange(e.value) }}
                    optionLabel="ful_name" optionValue="emp_id" placeholder="ເລືອກ ທ່ານ ຜອ" />
                  <label htmlFor={name}>ຄະນະ 4</label>
                </span>)} />
              {errors?.deputy_four?.message && <small className="p-invalid required-star">ເລືອກ ຄະນະ ດ້ວຍ</small>}
            </div>
          </div>)
        const contractInfo = (
          <div className='card' style={{ height: "23.4rem" }}>
            <label htmlFor="attachment_files" className='mt-2' style={{ color: "#2684FF", fontWeight: "bold" }}>{lang === "LA" ? "ຂໍ້ມູນຕິດຕໍ່" : "Contract Info"}</label>
            <div className="field" style={{ marginTop: "1rem", }}>
              <span className="contentfloat" style={{ width: "100%", marginTop: "1rem" }}>
                <InputText disabled={openEdit} {...register("tel_phone")} placeholder="" className="input-text" />
                <label htmlFor="tel_phone" >{lang === "LA" ? "ເບີໂທ" : "Phone"} <span className='required-star' >*</span></label>
              </span>
              {errors?.tel_phone?.message && <small className="p-invalid required-star">ກະລຸນາ ປ້ອນ ເບີໂທ</small>}
            </div>
            <div key="whatapp" className="field">
              <span className="contentfloat" style={{ width: "100%", marginTop: "1rem" }}>
                <InputText disabled={openEdit} {...register("whatapp")} placeholder="" className="input-text" />
                <label htmlFor="whatapp" >{lang === "LA" ? "ເບີແອັບ" : " Whatapp"} <span className='required-star' >*</span></label>
              </span>
              {errors?.whatapp?.message && <small className="p-invalid required-star">ກະລຸນາ ປ້ອນ ເບີແອັບ</small>}
            </div>
            <div key="email" className="field">
              <span className="contentfloat" style={{ width: "100%", marginTop: "1rem" }}>
                <InputText disabled={openEdit} {...register("email")} placeholder="" className="input-text" />
                <label htmlFor="email" >{lang === "LA" ? "ອີເມວ" : "Email"} <span className='required-star' >*</span></label>
              </span>
              {errors?.email?.message && <small className="p-invalid required-star">ກະລຸນາ ປ້ອນ ອີເມວ</small>}
            </div>
          </div>)
        return (
          <div className="info-user-container">
            <div className="row">
              <div className="col">
                {basiceInfo}
              </div>
              <div className="col">
                {deputies}
              </div>
            </div>
            <div className="row">
              <div className="col">
                {currentDepartment}
              </div>
              <div className="col">
                {contractInfo}
              </div>
            </div>
          </div>

        );
      }}
    </Form>
  );

  const DialogFooter = (
    <div style={{ width: "100%", margin: "1rem 1rem 1rem -1rem", display: "flex", justifyContent: "flex-end" }}>
      <Button label={openEdit == false ? "ຍົກເລີກ" : "ແກ້ຂໍ້ມູນ" } icon={openEdit == false ? "pi pi-times" : "pi pi-user-edit" }  text={openEdit == false ? true : false } onClick={()=>{openEdit == false ? handClose() : handOpen() }} />
      {openEdit == false ? <Button label="ແກ້ໄຂ" icon="pi pi-check" form="createExportForm" type="submit" style={{ marginLeft: "1rem" }} /> : <></> } 
    </div>
  );

  return (<>{FormCreate} {DialogFooter}</>);
}
