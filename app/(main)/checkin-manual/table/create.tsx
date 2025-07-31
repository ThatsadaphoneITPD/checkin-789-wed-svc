'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import toast from 'react-hot-toast';

import ClockDisplay from './clock';
import {
  createCheckinManaul,
  CreateCheckinManaulInput
} from '@/utils/validators/create-checkin-manual.schema';
import { Checkin } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckinManualStore } from '@/app/store';
import { InputText } from 'primereact/inputtext';

interface CreateOutSideWorkProps {
  rowItem?: Checkin.CheckinManual;
  setRowData?: (v: Checkin.CheckinManual | null) => void;
}

export default function Create({ rowItem, setRowData }: CreateOutSideWorkProps) {
  const { manunalEmployee, getzManualEmps, clearManualEmps, addCheckinManaul } = useCheckinManualStore();
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const defaultValues = useMemo<CreateCheckinManaulInput>(
    () => ({
      EmpCode: rowItem?.emp_code ?? '',
      Punch_time: rowItem?.punch_time
        ? typeof rowItem.punch_time === 'string'
          ? rowItem.punch_time
          : rowItem.punch_time.toISOString()
        : '',
      Comments: rowItem?.comments ?? ''
    }),
    [rowItem]
  );

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateCheckinManaulInput>({
    resolver: zodResolver(createCheckinManaul),
    defaultValues
  });


  const watchPunchTime = watch('Punch_time');

  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    reset(defaultValues)
    if (defaultValues.EmpCode) {
      getzManualEmps(defaultValues.EmpCode);
    }
  }, [defaultValues, reset]);
  useEffect(() => console.log('errors', errors), [errors]);

  // Watch EmpCode with debounce, call getzManualEmps if length > 5

  const handleReset = () => {
    setIsResetting(true);
    clearManualEmps();
    setTimeout(() => {
      reset({
        EmpCode: '',
        Punch_time: '',
        Comments: ''
      });
      setRowData?.(null);
      setIsResetting(false);
    }, 600);
  };

  const onSubmit: SubmitHandler<CreateCheckinManaulInput> = async data => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    try {
      console.log("data", data)
      // if (defaultValues?.EmpCode) {
      //   toast.success(`Edit! ${defaultValues?.EmpCode}`);
      // } else {
      //   toast.success(`Saved! ${watch_emp_code}`);
      // }
      // --------------------- API --------------------
      addCheckinManaul(formData).then((res: any)=>{
        if(res?.status == 200 || res?.status == 201) {
          toast.success(res.sms);
        }else { 
          toast.error(res.sms)
        }
      })
      handleReset();
    } catch (error: any) {
      toast.error(error?.message || 'Error occurred');
    }
  };

  const formattedTime = useMemo(() => {
    if (!watchPunchTime) return '';
    const date = new Date(watchPunchTime);
    const h = date.getHours();
    const m = date.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(
      2,
      '0'
    )} ${ampm}`;
  }, [watchPunchTime]);

  return (
    <div
      className="surface-card"
      style={{
        borderRadius: '15px',
        padding: '0.3rem',
        background:
          'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      }}
    >
      <div
        className="surface-card py-3 px-4 sm:px-5"
        style={{ borderRadius: '15px' }}
      >
        <form
          id="createExportForm"
          onSubmit={handleSubmit(onSubmit)}
          className="p-fluid"
        >
          <div className="flex w-full justify-content-end mb-2">
            <i
              className={`pi cursor-pointer text-2xl p-2 text-blue-600 hover:text-blue-800 absolute -mt-3 -mr-4 ${isResetting ? 'pi-spin pi-spinner' : 'pi-refresh'}`}
              onClick={handleReset}
            />
          </div>

          <div className="field">
            <ClockDisplay formattedTime={formattedTime} />
          </div>

          {/* date */}
          <div className="grid mt-5">
            <Controller
              name="Punch_time"
              control={control}
              render={({ field }) => (
                <span className="contentfloat w-full">
                  <Calendar
                    id={field.name}
                    showIcon
                    showTime
                    hourFormat="24"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(e) => {
                      const localDate = e.value as Date;
                      const pad = (n: number) => n.toString().padStart(2, '0');
                      const toLocalISO = (date: Date) => {
                        return (
                          date.getFullYear() +
                          '-' + pad(date.getMonth() + 1) +
                          '-' + pad(date.getDate()) +
                          'T' + pad(date.getHours()) +
                          ':' + pad(date.getMinutes()) +
                          ':' + pad(date.getSeconds())
                        );
                      };
                      const formatted = toLocalISO(localDate); // e.g. "2025-07-30T17:00:00"
                      field.onChange(formatted);
                    }}
                    className="calendar-create w-full"
                  />
                  <label htmlFor={field.name}>
                    ວັນທີ ເຂົ້າ-ອອກ
                    <span className="required-star">*</span>
                    {errors.Punch_time && (
                      <small className="p-invalid required-star">
                        ເລືອກວັນທີ
                      </small>
                    )}
                  </label>
                </span>
              )}
            />
          </div>

          {/* employee input */}
          <div className="field mt-2">
            <div className="w-full text-center">
              <div className="content-emp mt-3">
                <div className="content-emp__container">
                  {manunalEmployee ? (
                    <>
                      <i className="content-emp__container__text pi pi-users animate-in"></i>
                      <ul className="content-emp__container__list text-center">
                        <li className="content-emp__container__list__item animate-in text-sm">
                          {manunalEmployee}
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <i className="content-emp__container__text pi pi-search animate-out"></i>
                      <ul className="content-emp__container__list text-center">
                        <li className="content-emp__container__list__item animate-out">
                          ---ບໍ່ພົບ---
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="field mt-4">
            <Controller
              name="EmpCode"
              control={control}
              render={({ field }) => (
                <span className="contentfloat w-full">
                  <InputText
                    id={field.name}
                    type="search"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      const keyword = e.target.value?.trim() ?? '';
                      if (keyword.length >= 5) {
                        typingTimeout.current = setTimeout(() => {
                          console.log("EmpCode", keyword)
                          getzManualEmps(keyword);
                        }, 300);
                      }
                      if (keyword.length < 5) {
                        clearManualEmps();
                      }
                    }}
                    className={`w-full ${errors.EmpCode ? 'p-invalid' : ''}`}
                  />
                  <label htmlFor={field.name}>
                    ພະນັກງານ<span className="required-star">*</span>
                  </label>
                  {errors.EmpCode && (
                    <small className="p-invalid required-star">ເລືອກດ້ວຍ</small>
                  )}
                </span>
              )}
            />
          </div>

          {/* reason */}
          <div className="field mt-4">
            <span className="contentfloat w-full">
              <InputTextarea rows={4} {...register('Comments')} />
              <label htmlFor="reason">
                ປ້ອນຄຳເຫັນ<span className="required-star">*</span>
                {errors.Comments && (
                  <small className="p-invalid required-star">
                    {errors.Comments.message}
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
