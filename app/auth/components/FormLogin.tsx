'use client'
import React from 'react'
import Button from '@/app/components/ui/button/Button'
import type { LoginFormFields } from '@/types/auth'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import * as yup from "yup";

import AuthService from '@/services/auth/auth.service'
import { useUserStore } from '@/stores/user.store'
import Link from 'next/link'


const schema = yup.object({
  email: yup.string().email('Введіть коректну електронну пошту').required('Це поле обобязкове'),
  password: yup.string().required('Це поле обобязкове').min(6, 'Мінімальна кількість символів: 6'),
}).required();

const FormLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFields>({
    resolver: yupResolver(schema),
  });
  const router = useRouter()
  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const res = await AuthService.main('login', data)
      if(res.data.user) {
        useUserStore.getState().setUser(res.data.user)
        useUserStore.getState().setIsAuth(true)
      }
      // router.replace('/')
    } catch (error) {
      const response = (error as any).response
      if (response && response.data) {
        toast.error('Помилка', {
          description: 'Невірний логін або пароль',
        })
      }
    }
  };

  return (
    <div className='max-w-[500px] w-full bg-[var(--secondary)] p-7 rounded-lg border border-[var(--border)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>Вхід</h2>
          <p className='secondary-text'>Введіть ваші дані для входу</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <input 
              placeholder="Електронна пошта" 
              id='email' 
              className={`input ${errors.email && 'error'}`}
              type="text" 
              {...register('email', { required: true })}
            />
            {errors.email && <span className='text-[var(--red)] text-[12px]'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <input 
              placeholder="Пароль" 
              id="password" 
              className={`input ${errors.password && 'error'}`} 
              type="password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && <span className='text-[var(--red)] text-[12px]'>{errors.password.message}</span>}
          </div>
          <Button className='w-full mt-5 h-[48px]'>Увійти</Button>
          <p>
            Немає акаунту? <Link className='text-[var(--blue)]' href="/auth/signup">Реєстрація</Link>
          </p>
        </form>
        <Toaster richColors />
      </div>
    </div>
  )
}

export default FormLogin