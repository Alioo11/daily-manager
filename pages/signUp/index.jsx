import React, { useState } from 'react'
import Link from 'next/link'

function SignUp() {
    const [singInErr, setSignInErr] = useState('sdfsdf')
    const [passwordErr, setPasswordErr] = useState('sdfsdf')
    const handleSignUp = (e) => {
        e.preventDefault()
        alert('hello we sign up now')
    }

    return (
        <div>
            <div className="container">
                <div className="header">sign Up</div>
                <div className="card">
                    <form action="">
                        <div className="input-section">
                            <label htmlFor="username">username</label>
                            <input className="input" type="text" name="username" id="username" />
                            {singInErr ? <div className="error-text">  {singInErr}</div> : <div></div>}
                        </div>
                        <div className="input-section">
                            <label htmlFor="password">password</label>
                            <input className="input" type="password" name="password" id="password" />
                            {passwordErr ? <div className="error-text">{passwordErr}</div> : <div></div>}
                        </div>
                        <div className="input-section">
                            <label htmlFor="password">confirm password</label>
                            <input className="input" type="password" name="confirm-password" id="confirm-password" />
                            {passwordErr ? <div className="error-text">{passwordErr}</div> : <div></div>}
                        </div>
                        <button onClick={(e) => handleSignUp(e)} className="btn-block">sign up </button>
                        <p>Already have an account <span className="link"><Link href="/signIn">sing in</Link></span>.</p>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default SignUp
