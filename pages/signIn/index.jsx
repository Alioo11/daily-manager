import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/client'

const SING_IN_USER = gql`
query signInUser(
  $userName :String!
  $password:String!
){
  signIn(userName:$userName , password:$password){
    userName
    password
    auth
  }
}
`

function SignIn() {
    const rout = useRouter()
    const userNameRef = useRef()
    const passWordRef = useRef()
    const [userNameErr, setUserNameErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const [signInUser, { data, loading, error }] = useLazyQuery(SING_IN_USER)

    const handleSignIn = (e) => {
        e.preventDefault()
        const userName = userNameRef.current.value;
        const password = passWordRef.current.value;

        if (!userName) {
            setUserNameErr("unvalid user name")
        } else if (userName) {
            setUserNameErr("")
        }
        if (!password) {
            setPasswordErr("unvalid Password")
        } else if (password) {
            setPasswordErr('')
        }
        if (userName && password) {
            signInUser({ variables: { userName: userName, password: password } })
        }
    }

    useEffect(() => {
        if (data) {
            const { signIn } = data
            console.log(signIn);
            if (signIn !== null) {
                window.localStorage.setItem("TOKEN", signIn.auth)
                console.log(window.localStorage.getItem("TOKEN"));
                rout.push({ pathname: "/home", query: { isRefetch: true } })
            }
        }
    }, [loading])


    return (
        <div className="container">
            <div className="header">sign in</div>
            <div className="card">
                <form action="">
                    <div className="input-section">
                        <label htmlFor="username">username</label>
                        <input className="input" type="text" name="username" id="username" ref={userNameRef} />
                        {userNameErr ? <div className="error-text">  {userNameErr}</div> : <div></div>}
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
