import React from 'react'

export default function RegisterForm(props) {
    const { values, change, submit, errors, disabled } = props


    const handleSubmit = (event) => {
        event.preventDefault()
        submit()
    }
    const onChange = (event) => {
        //console.log(event)
        const { name, value, type, checked } = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }
    return (
        <div className='registerFormContainer'>
            <h1>Please Register</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor='firstName'>
                    Please Provide First Name:
                    <input
                        id='firstname'
                        type='text'
                        name='firstname'
                        placeholder='First Name'
                        value={values.firstname}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor='lastname'>
                    Please Provide Last Name:
                    <input
                        id='lastname'
                        type='text'
                        name='lastname'
                        placeholder='Last Name'
                        value={values.lastname}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor='email'>
                    Please Provide Email:
                    <input
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={values.email}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor='username'>
                    Please Provide Username:
                    <input
                        id='username'
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={values.username}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor='password'>
                    Please Provide a Password:
                    <input
                        id='password'
                        type='text'
                        name='password'
                        placeholder='Password'
                        value={values.password}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor='terms'>
                    Please Accept Terms of Service:
                    <input
                        id='terms'
                        type='checkbox'
                        name='terms'
                        value={values.terms}
                        onChange={onChange}
                    />
                </label>
                <button id='submit' disabled={disabled} onClick={handleSubmit}>
                    Submit!
                </button>
                <div className='errors'>
                    <div>{errors.firstName}</div>
                    <div>{errors.lastName}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.username}</div>
                </div>
            </form>
        </div>
    )
}