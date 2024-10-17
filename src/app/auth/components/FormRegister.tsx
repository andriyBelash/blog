'use client'
import React from 'react'
import Button from '@/src/app/components/ui/button/Button'
import type { SignupFormFields } from '@/src/types/auth'

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link'

const schema = yup.object({
  username: yup.string().min(3, 'Мінімальна кількість символів: 3').required('Це поле обобязкове'),
  email: yup.string().email('Введіть коректну електронну пошту').required('Це поле обобязкове'),
  password: yup.string().required('Це поле обобязкове').min(6, 'Мінімальна кількість символів: 6'),
}).required();

const FormRegister= () => {

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormFields>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignupFormFields> = data => console.log(data);

  return (
    <div className='max-w-[500px] w-full bg-[var(--secondary)] p-7 rounded-lg border border-[var(--border)]'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>Реєстрація</h2>
          <p className='secondary-text'>Введіть ваші дані для реєстрації</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          
          <div className='flex flex-col gap-1'>
            <input 
              placeholder='Імʼя' 
              id='name' 
              className={`input ${errors.username && 'error'}`}
              type="text" 
              {...register('username', { required: true })}
            />
            {errors.username && <span className='text-[var(--red)] text-[12px]'>{errors.username.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <input 
              placeholder='Електронна пошта' 
              id='email' 
              className={`input ${errors.email && 'error'}`}
              type="email" 
              {...register('email', { required: true })}
            />
            {errors.email && <span className='text-[var(--red)] text-[12px]'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <input 
              placeholder='Пароль'
              id="password" 
              className={`input ${errors.password && 'error'}`} 
              type="password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && <span className='text-[var(--red)] text-[12px]'>{errors.password.message}</span>}
          </div>
          <Button className='w-full mt-5 h-[48px]'>Зареєструватися</Button>
          <p>
            Ви вже маєте акаунт? <Link className='text-[var(--blue)]' href="/auth/login">Вхід</Link>
          </p>
        </form>


      </div>
    </div>
  )
}

export default FormRegister