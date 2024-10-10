'use client'
import Image from 'next/image'
import React from 'react'; // Thêm dòng này
import { useRouter } from 'next/navigation'
import { FilmIcon, MonitorIcon } from '@iconicicons/react'

export default function FilmCard(data: any) {
  console.log('cardddddd', data.data)
  const  router = useRouter()
  const handleClick = (e:any) => {
    e.preventDefault()
    if (data.data.type === 'movie') {
      // if(localStorage.getItem('movie')) localStorage.removeItem('movie')
      //   else localStorage.setItem('movie',JSON.stringify(data.data))
      router.push(`/movie/${data.data.id}`)
    } else if (data.data.type === 'tvshow') {
      router.push(`/tv/${data.data.id}`)
    }
  }
  const renderCategoryIcon = (category: string) => {
    if (category === 'movie') {
      return <FilmIcon className="pl-1 text-base" />
    } else {
      return <MonitorIcon className="pl-1 text-base" />
    }
  }

  const renderCategoryText = (category: string) => {
    if (category === 'movie') {
      return 'Movie'
    } else {
      return 'TV Shows'
    }
  }
  return (


    <div
      onClick={handleClick}
      className='w-[183px] h-[349px] border-2  shadow-lg rounded-lg flex flex-col hover:cursor-pointer'
    >
      <div className="w-[180px] h-[237px]">

        <Image
          src={data.data.thumb_url}
          alt={data.data.name}
          width={154}
          height={231}
          className="w-full h-full rounded-md"
          unoptimized
        />
      </div>
      <p className="mt-1 text-center dark:text-zinc-400 text-zinc-600 basis-1/2  font-bold line-clamp-2">
        {data.data.name}
      </p>
      <p className="mt-1 text-center dark:text-zinc-400 text-zinc-600 basis-1/4">
        {data.data.year}
      </p>
      <p className="flex justify-center items-end mt-1 dark:text-zinc-400 text-zinc-600 basis-1/4">
        {renderCategoryIcon(data.data.type)}
        <span className="pl-[6px] pr-[6px] ">
          {renderCategoryText(data.data.type)}
        </span>
      </p>

    </div>
  )
}

