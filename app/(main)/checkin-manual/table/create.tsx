'use client';
import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useOutSideWorkStore, authenStore } from '@/app/store';
import toast from 'react-hot-toast';
import { Button } from 'primereact/button';
import { Form } from '@/app/components/ui/form';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Checkin } from '@/types';
import RocketFlamingIcon from '@/app/components/icons/rocket-flaming';
import { createCheckinManaul, CreateCheckinManaulInput } from '@/utils/validators/create-checkin-manual.schema';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { employeea } from './dummy-data';
import ClockDisplay from './clock';
// import { CreateMobileUserkInput, createMobileUser } from '@/utils/validators/create-mobile-user.schema';

interface CreateOutSideWorkProps {
  rowItem?: Checkin.CheckinManual;
}


export default function Create({ rowItem }: CreateOutSideWorkProps) {
  const [lang, setLang] = useState("LA");
  const [reset, setReset] = useState({});
  const {approveOutSideWork }= useOutSideWorkStore()
  const {authData} = authenStore();
  // 1 GB = 1 * 10^9 bytes // or 2 GB = 2 * 10^9 bytes
//   const Gigabytes = 1 * (10 ** 9);
  const [openModal, setopenModal] = useState(false)
  const handOpen = () => { setopenModal(true) }
  const handClose = () => { setopenModal(false) }

  const onSubmit: SubmitHandler<CreateCheckinManaulInput> = async (data) => {
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
  
      approveOutSideWork(formData).then((res: any)=>{ console.log("res", res) 
        if(res?.status == 201) {
          if (res.approvething == "Approved") {
            handClose();
            toast.success(res.sms)
          }else if (res.approvething == "Rejected") {
            handClose();
            toast(
              `ໄດ້ປະຕິເສດ ການອອກວຽກນອກ ເລກທີ ${rowItem?.emp_code}`, { icon: <RocketFlamingIcon style={{width: "1.5rem", height: "1.5rem"}}/>, style: { border: '1px solid #FFA500', color: '#333', background: '#FFFAE5',  },  duration: 5000, }
            );
          }
        }else { toast.error(res.sms)}
      })
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
    in: { status: 'check_in', l_status: 'ເຂົ້າ' },
    out: { status: 'check_out', l_status: 'ອອກ' },
} as const;

const fieldstatus = Object.entries(fieldStatus).map(([key, value]) => ({
    name: value.status,
    la: value.l_status,
    value: key
}));

 const emps = Object.entries(employeea).map(([key, value]) => ({ ful_name: `${value?.employee?.first_name} ${value?.employee?.last_name} [${value?.employee?.emp_code}]`, id: value?.employee?.emp_code}));

 const FormCreate = (
    <Form<CreateCheckinManaulInput> id="createExportForm" resetValues={reset} validationSchema={createCheckinManaul} onSubmit={onSubmit} className="p-fluid"
        useFormProps={{
          defaultValues: {
              status_in_out: rowItem?.status_in_out ,
              reason: "",
          },
        }}
        >
      {({ register, control, watch, formState: { errors } }) => {
        console.log("err", errors)
        // const watchto_md = watch("to_md");
        // console.log("watchat_files", watchat_files)
        const watch_check_date = watch("check_date");
        let formattedTime = "";
        if (watch_check_date) {
          const date = new Date(watch_check_date);
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          formattedTime = `${(hours % 12 || 12).toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;
        }
        return (
          <div className="card">
            <div key="approvedBy" className="field" style={{ marginTop: "0.6rem" }}>
              <Controller
                  name="emp_code"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <span className="contentfloat" style={{ width: "100%" }}>
                      <Dropdown
                        showClear
                        filter
                        onFilter={(e)=>{
                          console.log("Filter input value:", e.filter);
                        }}
                        id={name} options={emps} value={value}  
                        onChange={(e) => onChange(e.value)} 
                        optionLabel="ful_name"  optionValue="id" placeholder="ເລືອກ ຄະນະ" className="w-full"
                      />
                      <label htmlFor={name}>ພະນັກງານ</label>
                    </span>
                  )}
                />
                {errors?.emp_code && <small className="p-invalid required-star">ເລືອກ ຄະນະທ່ານ ດ້ວຍ</small>}
            </div>
            <div className="grid" style={{ marginTop: "1.5rem", marginLeft: "0.02rem"}}>
              <Controller key="check_date" name="check_date" control={control} render={({ field: { name, value, onChange } }) => (
                <span className="contentfloat" style={{ width: "99.6%" }}>
                  <Calendar
                    id={name}
                    showIcon className="calendar-create"
                    showTime hourFormat="12"
                    onChange={(e: any) => { onChange(e.value ? e.value.toISOString() : ''); }}
                    value={value ? new Date(value) : null}
                  />
                  <label htmlFor={name}>ວັນທີ ເຂົ້າ-ອອກ<span className='required-star' >*</span>{errors?.check_date?.message && <small className="p-invalid required-star">ເລືອກວັນທີ</small>}</label>
                </span>)}
              />
            </div>
            <div  className='filed'>
              <ClockDisplay formattedTime={formattedTime} />
            </div>
            <div style={{ marginTop: "0.5rem" }} className='filed'>
              <label htmlFor="attachment_files" className='mt-2' style={{ color: "#2684FF", fontWeight: "bold" }}>ເລືອກການອະນຸມັດ</label>
              <div className="grid p-fluid mt-1" style={{ width: "100%" }}>
                <div className="field col-12 md:col-6 ">
                    <div className="flex flex-wrap gap-3">
                    {fieldstatus?.map((item: any, index: number) => (
                        <Controller key={"status_in_out" + index} name="status_in_out" control={control} render={({ field: { name, value, onChange } }) => (
                        <div key={index} className="flex align-items-center">
                            <RadioButton inputId={item?.key} name={name} value={value} onChange={() => { onChange(item?.name); }} checked={value === item?.name} />
                            <label htmlFor={item?.key} className="ml-2">{item?.la}</label>
                        </div>
                        )} />
                    ))}
                    </div>
                </div>
              </div>
            </div>
            <div key="reason" className="field" style={{ marginTop: "0.6rem" }}>
              <span className="contentfloat" style={{ width: "100%" }}>
                <InputTextarea  {...register("reason")} defaultValue={"ເຫັນດີ"} rows={5} cols={20} />
                <label htmlFor="reason" >{lang === "LA" ? "ປ້ອນຄຳເຫັນ" : "Comments"} <span className='required-star' >*</span></label>
              </span>
              {errors?.reason?.message && <small className="p-invalid required-star">{errors?.reason?.message}</small>}
            </div>
          </div>
        );
      }}
    </Form>
  );

  const DialogFooter = (
    <>
      <Button label="ບັນທຶກ" icon="pi pi-check" form="createExportForm" type="submit" />
    </>
  );
  const header = (<div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#2684FF" }}><div>ຄອບວຽກສະໜາມ ເລກທີ ({rowItem?.emp_code})</div></div>)

  return (
    <>
      {FormCreate}
    </>
  );
}
