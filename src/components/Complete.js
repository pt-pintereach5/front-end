import React from 'react'
import { Link } from 'react-router-dom'

export default function Complete() {
    return (
        <div className="completeContainer">
            <h2>Welcome to Pintereach</h2>

            <p>Please login to your account to continue.</p>
            <Link to='/login'>
                <button>Login</button>
            </Link>

        </div>

    )
}