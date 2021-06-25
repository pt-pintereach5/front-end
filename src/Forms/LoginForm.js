import React from 'react'

export default function LoginForm(props) {
    const { login, values, change } = props

    const handleSubmit = (event) => {
        event.preventDefault();
        login()
    }
    const onChange = (event) => {
        const { name, value } = event.target
        change(name, value)
    }
    return (
        <div className='loginFormContainer'>
            <h1>Login Here!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Provide Username:
                <input
                        id='username'
                        type='text'
                        name='username'
                        placeholder='Enter Username'
                        value={values.username}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor='password'>
                    Provide Password:
                <input
                        id='password'
                        type='text'
                        name='password'
                        placeholder='Enter Password'
                        value={values.password}
                        onChange={onChange}
                    />
                </label>
                <button onClick={handleSubmit}>Login!</button>
            </form>
        </div>
    )
}