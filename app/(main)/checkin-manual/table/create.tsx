'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import toast from 'react-hot-toast';

import ClockDisplay from './clock';
import { employeea } from './dummy-data';
import {
  createCheckinManaul,
  CreateCheckinManaulInput
} from '@/utils/validators/create-checkin-manual.schema';
import { Checkin } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateOutSideWorkProps {
  rowItem?: Checkin.CheckinManual;
  setRowData?: (v: Checkin.CheckinManual | null) => void;
}

export default function Create({ rowItem, setRowData}: CreateOutSideWorkProps) {
  /* —————————————————————————————————— form setup —————————————————————————————————— */
  const defaultValues = useMemo<CreateCheckinManaulInput>(
    () => ({
      emp_code: rowItem?.emp_code ?? '',
      check_date: rowItem?.check_date
        ? typeof rowItem.check_date === 'string'
          ? rowItem.check_date
          : rowItem.check_date.toISOString()
        : '',
      status_in_out: rowItem?.status_in_out ?? '',
      reason: rowItem?.comments ?? ''
    }),
    [rowItem] // recompute when a new row is selected
  );

  const { register,  watch,  control, handleSubmit, formState: { errors }, reset} = useForm<CreateCheckinManaulInput>({
    resolver: zodResolver(createCheckinManaul), // 🔑  Type‑safe resolver
    defaultValues
  });

  const [isResetting, setIsResetting] = useState(false);
   /* whenever rowItem changes, push the new values into the form */
  useEffect(() => reset(defaultValues), [defaultValues, reset]);
  useEffect(() =>  console.log("errors", errors), [errors]);

 
  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      reset({
        emp_code: '',
        check_date: '',
        status_in_out: '',
        reason: ''
      });
      setRowData(null);
      console.log("rowItem", rowItem)
      
      setIsResetting(false);
    }, 600);
  };

  /* ———————————————————————————— helpers/derived data ———————————————————————————— */
  const fieldStatus = {
    in: { status: 'check_in', l_status: 'ເຂົ້າ' },
    out: { status: 'check_out', l_status: 'ອອກ' }
  } as const;

 const fieldstatusOptions = useMemo(
    () =>
      Object.entries(fieldStatus).map(([key, v]) => ({
        value: key as 'in' | 'out', // 'in' or 'out'
        label: v.l_status
      })),
    []
  );

  const emps = useMemo(
    () =>
      Object.values(employeea).map(e => ({
        ful_name: `${e.employee.first_name} ${e.employee.last_name} [${e.employee.emp_code}]`,
        id: e.employee.emp_code
      })),
    []
  );

  /* —————————————————————————————— submit —————————————————————————————— */
  const watch_emp_code = watch("emp_code")
  const onSubmit: SubmitHandler<CreateCheckinManaulInput> = async data => {
   
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    /* submit… */
    console.log("defaultValues", defaultValues)
    try {
      if (defaultValues?.emp_code){
        toast.success(`Edit! ${defaultValues?.emp_code}`);
        handleReset()
      } else{
        toast.success(`Saved! ${watch_emp_code}`);
        handleReset()
      }
    } catch (error) {
      toast.error(error?.message)
    }
  };

  /* ———————————————————————————— watch → clock ———————————————————————————— */
  const watchCheckDate = watch('check_date');
  const formattedTime = useMemo(() => {
    if (!watchCheckDate) return '';
    const date = new Date(watchCheckDate);
    const h = date.getHours();
    const m = date.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(
      2,
      '0'
    )} ${ampm}`;
  }, [watchCheckDate]);

  /* ————————————————————————————— render ————————————————————————————— */
  return (
    <div className='surface-card ' style={{ borderRadius: '15px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
      <div  className="surface-card py-3 px-4 sm:px-5"   style={{ borderRadius: '15px',  }} >
        <form id="createExportForm" onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          {/* 🔄 Reset icon */}
          <div className="flex w-full justify-content-end mb-2">
              <i
                className={`pi  cursor-pointer text-2xl p-2 text-blue-600 hover:text-blue-800 absolute -mt-3 -mr-4 ${ isResetting ? 'pi-spin pi-spinner' : 'pi-refresh'}`}
                onClick={handleReset}
              />
          </div>
          
          <div className="field">
            <ClockDisplay formattedTime={formattedTime} />
          </div>

          {/* date */}
          <div className="grid mt-5">
            <Controller
              name="check_date"
              control={control}
              render={({ field }) => (
                <span className="contentfloat w-full">
                  <Calendar
                    id={field.name}
                    showIcon
                    showTime
                    hourFormat="24"
                    value={field.value ? new Date(field.value) : null}
                    onChange={e =>
                      field.onChange(e.value ? e.value.toISOString() : '')
                    }
                    className="calendar-create w-full"
                  />
                  <label htmlFor={field.name}>
                    ວັນທີ ເຂົ້າ-ອອກ
                    <span className="required-star">*</span>
                    {errors.check_date && (
                      <small className="p-invalid required-star">ເລືອກວັນທີ</small>
                    )}
                  </label>
                </span>
              )}
            />
          </div>

          {/* employee dropdown */}
          <div className="field mt-6">
            <Controller
              name="emp_code"
              control={control}
              render={({ field }) => (
                <span className="contentfloat w-full">
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    options={emps}
                    optionLabel="ful_name"
                    optionValue="id"
                    placeholder="ເລືອກ ພະນັກງານ"
                    // showClear
                    filter
                    className="w-full"
                    onChange={e => field.onChange(e.value)}
                  />
                  <label htmlFor={field.name}>
                    ພະນັກງານ<span className="required-star">*</span>
                    {errors.emp_code && (
                      <small className="p-invalid required-star">
                        ເລືອກດ້ວຍ
                      </small>
                    )}
                  </label>
                </span>
              )}
            />
          </div>

          {/* in / out radio */}
          <div className="field mt-4">
            <label className="text-blue-600">ເລືອກ ເຂົ້າ-ອອກ
              <span className="required-star">*</span> 
              {errors.status_in_out && (
                  <small className="p-invalid required-star">
                    {errors.status_in_out.message}
                  </small>
                )}</label>
            <div className="flex flex-wrap gap-3 my-1">
              <Controller
                name="status_in_out"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-3">
                    {fieldstatusOptions.map(opt => (
                      <div key={opt.value} className="flex align-items-center">
                        <RadioButton
                          inputId={opt.value}
                          value={opt.value}
                          checked={field.value === opt.value}
                          onChange={e => field.onChange(e.value)}
                        />
                        <label htmlFor={opt.value} className="ml-2">
                          {opt.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          {/* reason */}
          <div className="field mt-4">
            <span className="contentfloat w-full">
              <InputTextarea rows={4} {...register('reason')} />
              <label htmlFor="reason">
                ປ້ອນຄຳເຫັນ<span className="required-star">*</span>
                {errors.reason && (
                  <small className="p-invalid required-star">
                    {errors.reason.message}
                  </small>
                )}
              </label>
            </span>
          </div>

          <Button
            type="submit"
            icon="pi pi-verified"
            label="ບັນທຶກ ເຂົ້າ-ອອກ"
            className="mt-4"
          />
        </form>
      </div>
    </div>
  );
}
