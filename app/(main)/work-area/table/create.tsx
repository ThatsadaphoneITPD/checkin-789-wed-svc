'use client';
import React, { useMemo, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useOutSideWorkStore, authenStore, useWorkAreaStore, useLocationStore } from '@/app/store';
import toast from 'react-hot-toast';
import { Button } from 'primereact/button';
import { Form } from '@/app/components/ui/form';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Checkin } from '@/types';
import { CreateWorkAreaInput, createWorkAreaSchema } from '@/utils/validators/create-workarea.schema';
import GoogleMapComponent from '@/app/shared/google-map/google-map-pin';
import { InputText } from 'primereact/inputtext';
import { PiPlusBold } from 'react-icons/pi';
import { Dropdown } from 'primereact/dropdown';

interface CreateOutSideWorkProps {
  rowItem?: Checkin.WorkArea;
}


export default function Create({ rowItem }: CreateOutSideWorkProps) {
  const [lang, setLang] = useState("LA");
  const [reset, setReset] = useState({});
  const { authData } = authenStore();
  const { addWorkArea, updateWorkArea } = useWorkAreaStore();
  const { dataLocation } = useLocationStore();
  const [openModal, setopenModal] = useState(false)
  const [load, setLoading] = useState(false)
  const handOpen = () => { setopenModal(true) }
  const handClose = () => { setopenModal(false) }
  const handleLoadig = (value?: boolean) => {
    setLoading(value)
  }
  // console.log("rowItem", rowItem)

  const buttonDisable = (() => {
    switch (authData?.role) {
      case "admin":
        return false;
      case "branchadmin":
        return true;
      default:
        return true;
    }
  })();

  const onSubmit: SubmitHandler<CreateWorkAreaInput> = async (data) => {
    try {
      const formattedData = {
        ...data,
      };
      console.log("formattedData", formattedData);
      // Create a new FormData object
      const formData = new FormData();

      // Append each field to the FormData object
      Object.entries(formattedData).forEach(([key, value]) => {
        formData.append(key, value as string); // Convert to string if necessary
      });
      if (!rowItem) {
        addWorkArea(formData).then((res: any) => {
          if (res?.status == 201 || res?.status === 200) {
            handleLoadig(false);
            toast.success(res.sms)
            setReset({});
            handClose()
          } else {
            handleLoadig(false);
            toast.error(`${res.sms}-${res?.status}`)
          }
        })
      } else {
        updateWorkArea(formData, data?.work_area_id).then((res: any) => {
          if (res?.status == 201 || res?.status === 200) {
            handleLoadig(false);
            toast.success(res.sms)
            setReset({});
            handClose()
          } else {
            handleLoadig(false);
            toast.error(`${res.sms}-${res?.status}`)
          }
        })
      }
      console.log("sendAPI", formData);
    } catch (err: any) {
      console.log("errAPI", err.message);
    }
    // closeModal();
  };

  const optionLocations = Object?.values(dataLocation).map(e => ({
    ful_name: `${e.location_name}`,
    id: e.location_id
  }));

  const FormCreate = (
    <Form<CreateWorkAreaInput>
      id="createExportForm"
      resetValues={reset}
      validationSchema={createWorkAreaSchema}
      onSubmit={onSubmit}
      className="p-fluid"
      useFormProps={{
        defaultValues: {
          work_area_id: rowItem?.work_area_id,
          area_name: rowItem?.area_name,
          latitude: rowItem?.latitude,
          longitude: rowItem?.longitude,
          location_id: rowItem?.location_id || null,
          radius_km: rowItem?.radius_km || 0.11,
        },
      }}
    >
      {({ register, control, watch, setValue, formState: { errors } }) => {
        console.log("errors", errors)
        const watchlatitude = watch('latitude');
        const watchlongitude = watch('longitude');
        const watchradius_km = watch('radius_km');

        const markerPosition = {
          lat: watchlatitude,
          lng: watchlongitude,
        };

        const setMarkerPosition = (pos: { lat: number; lng: number }) => {
          setValue('latitude', pos.lat);
          setValue('longitude', pos.lng);
        };
        const setRadius = (radius: number) => {
          setValue('radius_km', radius)
        }

        return (
          <>
            <div key="approvedBy" className=" mt-4">
              <div className="field w-full">
                <Controller
                  name="location_id"
                  control={control}
                  render={({ field }) => (
                    <span className="contentfloat w-full">
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        disabled={buttonDisable}
                        options={optionLocations}
                        optionLabel="ful_name"
                        optionValue="id"
                        placeholder="ເລືອກ ສັງກັດ-ຫ້ອງການ"
                        // showClear
                        filter
                        className="w-full"
                        onChange={e => field.onChange(e.value)}
                      />
                      <label htmlFor={field.name}>
                        ສັງກັດຫ້ອງການ ຝ່າຍ/ສາຂາ<span className="required-star">*</span>
                        {errors.location_id && (
                          <small className="p-invalid required-star">
                            ເລືອກດ້ວຍ
                          </small>
                        )}
                      </label>
                    </span>
                  )}
                />
              </div>
              <span className="contentfloat w-full mt-2">
                <InputTextarea
                  {...register('area_name')}
                  rows={2}
                  cols={20}
                />
                <label htmlFor="content">
                  {lang === "LA" ? "ຊື່ສະຖານທີເຮັດວຽກ" : "Work Area"} <span className='required-star'>*</span>
                </label>
              </span>
            </div>
            <div className="formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="latitude">Latitude</label>
                <InputText
                  id="latitude"
                  type="number"
                  step="any"
                  className="w-full"
                  {...register('latitude', {
                    valueAsNumber: true,
                    required: "ລະບຸພິກັດ latitudeitude",
                  })}
                />
                {errors.latitude && <small className="p-error">{errors.latitude.message}</small>}
              </div>

              <div className="field col-12 md:col-6">
                <label htmlFor="longitude">Longitude</label>
                <InputText
                  id="longitude"
                  type="number"
                  step="any"
                  className="w-full"
                  {...register('longitude', {
                    valueAsNumber: true,
                    required: "ລະບຸພິກັດ Longitude",
                  })}
                />
                {errors.longitude && <small className="p-error">{errors.longitude.message}</small>}
              </div>
            </div>

            <div className="w-full">
              ຈຸດພິກັດ ກົດເຂົ້າ-ອອກ
              <GoogleMapComponent radius_km={watchradius_km} setRadius={setRadius} markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
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
  const header = (<div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#2684FF" }}><div>{rowItem?.work_area_id && "ແກ້ໄຂ"} ສະຖານທີ ເຮັດວຽກ  {rowItem?.work_area_id && (rowItem?.work_area_id)}</div></div>)

  return (
    <>
      <Dialog visible={openModal} header={header} footer={DialogFooter} onHide={handClose} style={{ width: "600px", padding: "none", marginBottom: "none" }} modal className={`modal-form `}>
        {FormCreate}
      </Dialog>
      {rowItem ?
        <button className="button custom-target-des" data-pr-tooltip="ແກ້ໄຂ" onClick={() => handOpen()} >
          <i className='pi pi-map-marker' ></i>
        </button>
        :
        <span className="">
          <Button
            icon={<PiPlusBold className="me-1.5 mt-0" />}
            style={{
              backgroundColor: "#2f54eb",
              borderColor: "#2f54eb",
              color: "#ffffff",
              width: "2rem",
              height: "2rem",
              fontSize: "1.3",
              fontWeight: "bold"
            }}
            onClick={() => handOpen()}
            rounded
            text raised
          />
        </span>
      }
    </>
  );
}
