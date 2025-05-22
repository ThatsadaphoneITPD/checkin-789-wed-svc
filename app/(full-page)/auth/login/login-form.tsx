'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Form } from '@/app/components/ui/form';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import authenStore from '@/app/store/user/loginAuthStore';
import { useUsersStore } from '../../../store/user/usersStore';
import { Checkbox } from 'primereact/checkbox';
import { log } from 'console';

const initialValues: LoginSchema = {
    username: '',
    password: '',
};

export default function SignInForm() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const { setAuthData } = authenStore();
    const { loginUser } = useUsersStore();

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        try {
            setLoading(true);
            const resp: any = await loginUser(data);
            if (resp.status === 201 || resp.status === 200) {
                toast.success('Welcome to Check-IN Time App');
                console.log("Token", resp)
                localStorage.setItem('token', resp?.data?.accessToken);
                document.cookie = `token=${resp?.data?.accessToken}; path=/;`;
                setAuthData(resp?.data?.user);
                setTimeout(() => {
                    router.push('/');
                    setLoading(false);
                    // location.reload();
                }, 2000);
            }
        } catch (error: any) {
            console.log("catch")
            const { status} = error.response;
            setLoading(false);
            if (status === 401 && error.response.data == "Invalid username or password")
            {
                toast.error('Invalid username or password')
            } else{
                toast.error(error?.message);
            }
        }
    };

    return (
        <Form<LoginSchema>
            validationSchema={loginSchema}
            onSubmit={onSubmit}
            useFormProps={{
                mode: 'onChange',
                defaultValues: initialValues,
            }}
        >
            {({ register, control, formState: { errors } }) => (
                <div className="">
                    <div>
                        <label htmlFor="username" className="block text-900 text-sm sm:text-lg font-medium mb-2">
                            ລະຫັດພະນັກງານ
                        </label>
                        {errors.username?.message && (
                            <small className="p-invalid required-star">{errors.username?.message}</small>
                        )}
                    </div>
                    <InputText
                        {...register('username')}
                        id="username"
                        type="text"
                        placeholder="Enter your ID"
                        className="w-full mb-5"
                        style={{ padding: '1rem', borderRadius: '10px', height: "2.5rem" }}
                    />

                    <div>
                        <label htmlFor="password" className="block text-900 font-medium text-sm sm:text-lg">
                            Password
                        </label>
                        {errors.password?.message && (
                            <small className="p-invalid required-star">{errors.password?.message}</small>
                        )}
                    </div>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Password
                                value={value}
                                onChange={onChange}
                                placeholder="Password"
                                toggleMask
                                className="w-full mb-5"
                                inputStyle={{ borderRadius: '10px', height: "2.5rem" }}
                                inputClassName="w-full p-3 md:w-20rem"
                            />
                        )}
                    />
                    <div />
                    <Button
                        loading={isLoading}
                        label="ເຂົ້າລະບົບ"
                        type="submit"
                        className="w-full p-3 text-sm sm:text-xl"
                        style={{ borderRadius: '10px', fontWeight: 'none', height: "3rem" }}
                    />
                </div>
            )}
        </Form>
    );
}
