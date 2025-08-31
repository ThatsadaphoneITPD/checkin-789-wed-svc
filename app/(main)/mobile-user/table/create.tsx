'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useLocationStore, useWorkAreaStore, authenStore } from '@/app/store';
import toast from 'react-hot-toast';
import { Button } from 'primereact/button';
import { Form } from '@/app/components/ui/form';
import { Dialog } from 'primereact/dialog';
import { Checkin } from '@/types';
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CreateMobileUserkInput, createMobileUser } from '@/utils/validators/create-mobile-user.schema';
import { Dropdown } from 'primereact/dropdown';
import { useUsersStore } from '@/app/store/user/usersStore';
import { number } from 'prop-types';

interface CreateMobileUserProps {
  rowItem: Checkin.MobileUser;
  handleCallWorkArea?: () => void;
}


export default function Create({ rowItem, handleCallWorkArea }: CreateMobileUserProps) {
  const [reset, setReset] = useState({});
  const { authData } = authenStore();
  const { moveUserWorkArea } = useUsersStore();
  const { dataLocation } = useLocationStore();
  const { dataworkarea, getzWorkAreaByLocationId } = useWorkAreaStore();
  // 1 GB = 1 * 10^9 bytes // or 2 GB = 2 * 10^9 bytes
  //   const Gigabytes = 1 * (10 ** 9);
  const [openModal, setopenModal] = useState(false)
  const handOpen = () => {
    setopenModal(true);
    if (rowItem) {
      handleCallWorkArea()
    }
  }
  const handClose = () => { setopenModal(false) }

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

  const onSubmit: SubmitHandler<CreateMobileUserkInput> = async (data) => {
    try {
      const formattedData = {
        work_area_id: data.work_area_id,
      };
      console.log("formattedData", formattedData)
      // Create a new FormData object
      const formData = new FormData();

      // Append each field to the FormData object
      Object.entries(formattedData).forEach(([key, value]) => {
        formData.append(key, value !== undefined && value !== null ? String(value) : "");
      });

      moveUserWorkArea(data?.user_id, formData).then((res: any) => {
        if (res?.status == 200) {
          handClose();
          toast.success(res.sms);
        } else {
          toast.error(res.sms)
        }
      })
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

  const optionWorkAreas = Object?.values(dataworkarea).map(e => ({
    ful_name: `${e.area_name}`,
    id: e.work_area_id
  }));

  const FormCreate = (
    <Form<CreateMobileUserkInput> id="createExportForm" resetValues={reset} validationSchema={createMobileUser} onSubmit={onSubmit} className="p-fluid"
      useFormProps={{
        defaultValues: {
          user_id: rowItem?.user_id,
          location_id: rowItem?.workAreas?.length && rowItem?.workAreas?.[0]?.location_id || null,
          work_area_id: rowItem?.workAreas?.length && rowItem?.workAreas?.[0]?.work_area_id || null,
        },
      }}
    >
      {({ register, control, watch, setValue, formState: { errors } }) => {
        console.log("err", errors)

        return (
          <>
            <div key="approvedBy" className="field" style={{ marginTop: "1.6rem" }}>
              <span className="contentfloat" style={{ width: "100%" }}>
                <Controller
                  name="location_id"
                  control={control}
                  render={({ field }) => {
                    return (
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
                          onChange={e => {
                            const selected = e.value ?? null;
                            field.onChange(selected);
                            if (selected) {
                              getzWorkAreaByLocationId(selected);
                            }
                            setValue("work_area_id", null);
                          }}
                        />
                        <label htmlFor={field.name}>
                          ສັງກັດ ຝ່າຍ/ສາຂາ<span className="required-star">*</span>
                          {errors.location_id && (
                            <small className="p-invalid required-star">
                              ເລືອກດ້ວຍ
                            </small>
                          )}
                        </label>
                      </span>
                    )
                  }}
                />
                <div className="mt-5">
                  <Controller
                    name="work_area_id"
                    control={control}
                    render={({ field }) => (
                      <span className="contentfloat w-full">
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          options={optionWorkAreas}
                          optionLabel="ful_name"
                          optionValue="id"
                          placeholder="ເລືອກ ສະຖານທີ"
                          // showClear
                          filter
                          className="w-full"
                          onChange={e => { field.onChange(e.value) }}
                        />
                        <label htmlFor={field.name}>
                          ສະຖານທີ ເຮັດວຽກ<span className="required-star">*</span>
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
  const header = (<div style={{ width: "100%", display: "flex", justifyContent: "center", color: "#2684FF" }}><div>ຕັ້ງຄ່າ ຈຸດພິກັດ ຜູ້ໃຊ້ ({rowItem?.emp_code}) ສາມາດ ກົດເຂົ້າ-ອອກ</div></div>)

  return (
    <>
      <Dialog visible={openModal} header={header} footer={DialogFooter} onHide={handClose} style={{ width: "600px", padding: "none", marginBottom: "none" }} modal className={`modal-form `}>
        {FormCreate}
      </Dialog>
      <button className="button custom-target-des" data-pr-tooltip="ຈຸດເຂົ້າວຽກ" onClick={() => handOpen()}>
        <LiaMapMarkedAltSolid size={20} />
      </button>
    </>
  );
}
