import React from 'react'
// import loader from './Eclipse@1x-0.7s-200px-200px.gif'
import loader from './Spinner.gif'

export default function Loading() {

    return (
        <div className='text-center'>
            <img src={loader} alt="Loading Animation" />
        </div>
    )

}


