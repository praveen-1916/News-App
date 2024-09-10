import React, { Component } from 'react'
// import spinner from './Spinner@1x-1.0s-200px-200px.gif'
import loader from './Eclipse@1x-0.7s-200px-200px.gif'

export default class Loading extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loader} alt="Loading Animation" />
            </div>
        )
    }
}

