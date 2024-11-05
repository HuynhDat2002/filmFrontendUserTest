'use client'

import { useSearchParams } from 'next/navigation'
import FilmList from '../../components/FilmList'
import FilmCard from '../../components/FilmCard'
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import React, { useState, useEffect } from 'react'
import { searchMovie } from '../../lib/features/movie.slice'
import { searchTV } from '../../lib/features/tv.slice'
import PageSearch from '../../components/PaginationSearch'
import ErrorModal from '../../components/ErrorModal'
import { Suspense } from "react";


export default function Search() {
    const searchParams = useSearchParams()
    const [searchList, setSearchList] = useState<Array<any>>([])
    const movie = useAppSelector((state) => state.movieReducer)
    const tv = useAppSelector((state) => state.tvReducer)
    const query = searchParams?.get('query') as string
    const page = searchParams?.get('page') as string
    const [isOpenError, setIsOpenError] = useState(false)
    const [messageError, setMessageError] = useState("")


    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(searchMovie({ query: query, page: page }))
        dispatch(searchTV({ query, page }))

    }, [query, page])

    useEffect(() => {
        let combinedList: Array<any> = []
        if (movie.isSearch && movie.isSuccess) combinedList = [...movie.movies.metadata]
        if (tv.isSearch && tv.isSuccess) combinedList = [...combinedList, ...tv.tvs.metadata]
        setSearchList(combinedList)
    }, [movie.isLoading, tv.isLoading])

    useEffect(() => {
        if (movie.isError && movie.isSearch) {
            setMessageError(movie.message?.message)
            setIsOpenError(true)
        }
        if (tv.isError && tv.isSearch) {
            setMessageError(tv.message?.message)
            setIsOpenError(true)
        }
    }, [movie.isLoading, tv.isLoading])
    return (
        // <div className="w-[90%] xl:w-[80%] flex justify-center items-center  mx-auto mt-10">
        <Suspense>
            <div className="flex flex-col gap-5 min-h-screen mt-10">

                <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-start">

                    {searchList.map((film: any) => (
                        <div
                            key={film._id}
                        >
                            <FilmCard data={film} />
                        </div>
                    ))}
                </div>
                {
                    searchList.length > 0 &&
                    <PageSearch total={searchList.length} />
                }
                {
                    searchList.length === 0 &&
                    <div className="flex justify-center items-center my-10 font-bold text-3xl">
                        Không tìm thấy kết quả mong muốn!
                    </div>
                }
            </div>
            <ErrorModal isOpen={isOpenError} onClose={() => setIsOpenError(false)} message={messageError} />
        </Suspense>
        // </div>

    )
}