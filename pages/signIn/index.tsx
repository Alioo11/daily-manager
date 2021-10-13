import React, { JSXElementConstructor, MouseEventHandler, useState } from 'react'
import Link from 'next/link'

function SignIn() {
    const [singInErr, setSignInErr] = useState('sdfsdf')
    const [passwordErr, setPasswordErr] = useState('sdfsdf')

    const handleSingIn = (e: Event) => {
        e.preventDefault()
        setSignInErr('noo whalaksjdf')
        setPasswordErr('noo what the heck are you doing')
    }



    return (
        <div className="container">
            <div className="header">sign in</div>
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
                    <button onClick={(e: any) => handleSingIn(e)} className="btn-block">sign in </button>
                    <p>don't have an account <span className="link"><Link href="/signUp">sing up</Link></span>.</p>
                </form>
            </div>
        </div >
    )
}

export default SignIn
