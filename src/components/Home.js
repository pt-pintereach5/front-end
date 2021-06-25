import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='homeContainer'>
            <Link to='/login'>
                <button>Already a Member?</button>
            </Link>
            <Link to='/register'>
                <button>New to Pintereach?</button>
            </Link>
        </div>
    )
}