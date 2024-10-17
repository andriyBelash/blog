'use client'
import { useUserStore } from '@/src/stores/user.store'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import AuthService from '@/src/services/auth/auth.service'

import SkeletonLoader from '@/app/components/ui/SkeletonLoader'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/ui/button/Button'
import { CiEdit } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";


const Skeleton: React.FC = () => {
  return (
   <div className='grid grid-cols-[100px_4fr] gap-5'>
     <SkeletonLoader height='100px' borderRadius='50%' />
     <SkeletonLoader height='100px' />
   </div>
  )
 }

const InfoBlock = () => {

 const user = useUserStore((state) => state.user)
 const globalLoader = useUserStore((state) => state.globalLoader)

 const router = useRouter()

  const [showEdit, setShowEdit] = useState<{username: boolean, email: boolean}>({ username: false, email: false })
  const [fields, setFields] = useState<{username: string, email: string}>({ username: user?.username || '', email: user?.email || '' })

  const toggleEdit = (field: 'username' | 'email') => {
    setFields({ username: user?.username || '', email: user?.email || '' })
    setShowEdit((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const save = async (field: 'username' | 'email') => {
    await useUserStore.getState().updateUser({ username: fields.username, email: fields.email })
    toggleEdit(field)
  }

  const changeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    formData.append('file', e.target.files![0])
    useUserStore.getState().updateLogo(formData)
  }

 const logout = async () => {
  await AuthService.logout()
  useUserStore.setState({ isAuth: false, user: null })
  router.replace('/')
 }

  return (
    <div>
      {
        globalLoader ? <Skeleton /> : 
        (
          <div className='flex items-end justify-between'>
            <div className='flex items-center gap-4'>
              <input onChange={changeFile} id='file' type='file' className='hidden' accept='image/*' />
              <label htmlFor='file' className='h-[100px] w-[100px] cursor-pointer active:scale-[0.95]'>
                <Image
                  src={user?.avatar_url || '/placeholder.png'}
                  width={100}
                  height={100}
                  alt='avatar'
                  className='rounded-md'
                  style={{ objectFit: 'cover', height: '100px' }}
                />
              </label>
              <div className='flex flex-col gap-4'>
                { showEdit.username ? (
                    <div className='flex items-center gap-4'>
                      <input
                        type='text'
                        placeholder='Ім’я'
                        className='input !h-[40px]'
                        value={fields.username}
                        onChange={(e) => setFields((prev) => ({ ...prev, username: e.target.value }))}
                      />
                      <Button type='outline' onClick={() => save('username')}>Зберегти</Button>
                    </div> )
                  : 
                  ( <div className='flex items-center gap-4'>
                      <h1 className='text-3xl font-bold'>{user?.username}</h1>
                      <button onClick={() => toggleEdit('username')} aria-label='редагувати'>
                        <CiEdit size={25} />
                      </button>
                    </div> )}
                { showEdit.email ? ( <div className='flex items-center gap-4'>
                      <input
                        type='text'
                        placeholder='Ел. пошта'
                        className='input !h-[40px]'
                        value={fields.email}
                        onChange={(e) => setFields((prev) => ({ ...prev, email: e.target.value }))}
                      />
                      <Button type='outline' onClick={() => save('email')}>Зберегти</Button>
                    </div>
                  ) : (
                    <div className='flex items-center gap-4'>
                      <p className='text-xl secondary-text font-medium'>{user?.email}</p>
                      <button onClick={() => toggleEdit('email')} aria-label='редагувати'>
                        <CiEdit size={25} />
                      </button>
                    </div> )}
              </div>
            </div>
            <div className='flex gap-4'>
              <Link href='settings'>
                <Button onClick={logout} type='outline'>
                  <CiLogout size={30}/>
                </Button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default React.memo(InfoBlock)