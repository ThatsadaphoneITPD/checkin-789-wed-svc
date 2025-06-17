import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useSickLeaveStore } from '@/app/store/sick-leave/sickLeaveStore';
// import { CreateSickLeaveInput, createSickLeaveSchema } from ".";
import toast from 'react-hot-toast';
import { Button } from 'primereact/button';
import { Form } from '@/app/components/ui/form';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { CreateSickLeaveInput, createSickLeaveSchema } from '@/utils/validators/create-sick-leave.schema';
import { Checkin } from '@/types';
import RocketFlamingIcon from '@/app/components/icons/rocket-flaming';
import GoogleMapShow from '@/app/shared/google-map/displaymap';
import { PhotoView } from 'react-photo-view';
import GlobalPhotoView from '@/app/shared/photo-view/container';
import { useOvertimeStore, authenStore } from '@/app/store';

interface CreateOvertimeProps {
    rowItem: Checkin.Overtime;
}

export default function CreateOvertime({ rowItem }: CreateOvertimeProps) {
  const [lang, setLang] = useState("LA");
  const [reset, setReset] = useState({});
  const {approveOvertime} = useOvertimeStore();
  const {authData} =authenStore();
  const [openModal, setopenModal] = useState(false)
  const handOpen = () => { setopenModal(true) }
  const handClose = () => { setopenModal(false) }

  const onSubmit: SubmitHandler<CreateSickLeaveInput> = async (data) => {
    try {
      const formattedData = {
        otId: `${rowItem?.ot_id}`,
        approvedBy: authData?.user_id,
        ...data,
      };
      // Create a new FormData object
      const formData = new FormData();
    
      // Append each field to the FormData object
      Object.entries(formattedData).forEach(([key, value]) => {
        formData.append(key, value as string); // Convert to string if necessary
      });
  
      approveOvertime(formData).then((res: any)=>{ console.log("res", res) 
        if(res?.status == 201) {
          if (res.approvething == "Approved") {
            handClose();
            toast.success(res.sms)
          }else if (res.approvething == "Rejected") {
            handClose();
            toast(`ໄດ້ປະຕິເສດ ການຄອບພັກ ເລກທີ ${rowItem?.ot_id}`, { icon: <RocketFlamingIcon style={{width: "1.5rem", height: "1.5rem"}}/>, style: { border: '1px solid #FFA500', color: '#333', background: '#FFFAE5',  }, duration: 5000,} );
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
    <Form<CreateSickLeaveInput> id="createExportForm" resetValues={reset} validationSchema={createSickLeaveSchema} onSubmit={onSubmit} className="p-fluid"
        useFormProps={{
            defaultValues: {
                status: rowItem?.status || 'Pending',
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
            <div key="approvedBy" className="field" style={{ marginTop: "0.6rem" }}>
              <span className="contentfloat" style={{ width: "100%" }}>
                <InputTextarea  defaultValue={rowItem?.description} disabled rows={2} cols={20} />
                <label htmlFor="content" >{lang === "LA" ? "ເນື້ອໃນການຂອບວຽກ" : "Content"} <span className='required-star' >*</span></label>
              </span>
            </div>
            <div className="grid">
              <div className="col-6">
                <GoogleMapShow
                  lat={rowItem?.latitude}
                  lng={rowItem?.longitude}
                  height="12rem"
                  width="16rem"
                />
              </div>
              <div className="col-6">
                <GlobalPhotoView
                  image={urltest}
                  render={() => (
                    <img
                      src={urltest}
                      className="w-12rem h-12rem object-cover"
                      alt=""
                    />
                  )}
                />
              </div>
            </div>
            <div style={{ marginTop: "1rem" }} className='filed'>
              <label htmlFor="attachment_files" className='mt-2' style={{ color: "#2684FF", fontWeight: "bold" }}>ເລືອກການອະນຸມັດ</label>
              <div className="grid p-fluid mt-3" style={{ width: "100%" }}>
                <div className="field col-12 md:col-6 ">
                    <div className="flex flex-wrap gap-3">
                    {fieldstatus?.map((item: any, index: number) => (
                        <Controller key={"status" + index} name="status" control={control} render={({ field: { name, value, onChange } }) => (
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
            <div key="comments" className="field" style={{ marginTop: "0.6rem" }}>
              <span className="contentfloat" style={{ width: "100%" }}>
                <InputTextarea  {...register("comments")} defaultValue={"ເຫັນດີ"} rows={2} cols={20} />
                <label htmlFor="comments" >{lang === "LA" ? "ປ້ອນຄຳເຫັນ" : "Comments"} <span className='required-star' >*</span></label>
              </span>
              {errors?.comments?.message && <small className="p-invalid required-star">{errors?.comments?.message}</small>}
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
  const header = (<div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#2684FF" }}><div>ຄອບວຽກສະໜາມ ເລກທີ ({rowItem?.ot_id})</div></div>)

  return (
    <>
      <Dialog visible={openModal} header={header} footer={DialogFooter} onHide={handClose} style={{ width: "600px", padding: "none", marginBottom: "none" }} modal className={`modal-form `}>
        {FormCreate}
      </Dialog>
       <button  className="button" onClick={() =>  handOpen()}>
          <i className='pi pi-check-square' ></i>
        </button>
    </>
  );
}
