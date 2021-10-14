import React, { JSXElementConstructor, MouseEventHandler, useState } from 'react'
import Link from 'next/link'
import { useRef } from 'react'
import axios from 'axios'

function SignIn() {

    const userNameRef = useRef()
    const passWordRef = useRef()


    const [singInErr, setSignInErr] = useState('sdfsdf')
    const [passwordErr, setPasswordErr] = useState('sdfsdf')


    const handleSignIn = async (e) => {

        try {
            e.preventDefault()
            const userName = userNameRef.current.value;
            const passWord = passWordRef.current.value;

            console.log(userName);
            console.log(passWord);


            const responce = await axios.post("http://localhost:3636/signIn/", {
                data: {
                    userName, passWord
                }
            })
            console.log(responce.data);
        }
        catch (err) {
            console.log(err);



        }

    }

    const handleSingIn = (e) => {
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
                        <input className="input" type="text" name="username" id="username" ref={userNameRef} />
                        {singInErr ? <div className="error-text">  {singInErr}</div> : <div></div>}
                    </div>
                    <div className="input-section">
                        <label htmlFor="password">password</label>
                        <input className="input" type="password" name="password" id="password" ref={passWordRef} />
                        {passwordErr ? <div className="error-text">{passwordErr}</div> : <div></div>}
                    </div>
                    <button onClick={(e) => handleSignIn(e)} className="btn-block">sign in </button>
                    <p>don't have an account <span className="link"><Link href="/signUp">sing up</Link></span>.</p>
                </form>
            </div>
        </div >
    )
}

export default SignIn
