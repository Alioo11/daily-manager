import React, { useState } from 'react'
import Link from 'next/link'
import { useRef } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { isAuth } from './../../helpers/isAuthenticated'

const SIGN_UP = gql`
mutation signUp(
  $userName : String!
  $password : String!
)
{
  signUp(userName:$userName , password :$password){
    userName
    password
    auth
  }
}
`

function SignUp() {
    const router = useRouter()
    const [userNameErr, setUserNameErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [cofirmPasswordErr, setConfirmPasswordErr] = useState('')
    const userRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    console.log(isAuth());

    const [signUpMutation, { data, loading, error }] = useMutation(SIGN_UP)


    const handleSignUp = (e) => {
        e.preventDefault()
        const userName = userRef.current.value;
        const password = passwordRef.current.value;
        const confirmPass = confirmPasswordRef.current.value;

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
        if (!confirmPass) {
            setConfirmPasswordErr("confirm password is not valid")
        } else if (confirmPass) {
            setConfirmPasswordErr('')
        }
        if (password.trim() !== confirmPass.trim()) {
            setConfirmPasswordErr('password does not match')
        } else if (password.trim() === confirmPass.trim()) {
            setConfirmPasswordErr('')
        }
        if (
            userName &&
            password &&
            confirmPass &&
            (password.trim() === confirmPass.trim())
        ) {
            signUpMutation({ variables: { userName: userName, password: password } }).then(res => {
                if (res.data.signUp.auth) {
                    window.localStorage.setItem("TOKEN", res.data.signUp.auth)
                    router.push("/home")
                } else {
                    alert('this user already exist')
                }
            })
        }
    }

    return (
        <div>
            <div className="container">
                <div className="header">sign Up</div>
                <div className="card">
                    <form action="">
                        <div className="input-section">
                            <label htmlFor="username">username</label>
                            <input ref={userRef} className="input" type="text" name="username" id="username" />
                            {userNameErr ? <div className="error-text">  {userNameErr}</div> : <div></div>}
                        </div>
                        <div className="input-section">
                            <label htmlFor="password">password</label>
                            <input ref={passwordRef} className="input" type="password" name="password" id="password" />
                            {passwordErr ? <div className="error-text">{passwordErr}</div> : <div></div>}
                        </div>
                        <div className="input-section">
                            <label htmlFor="password">confirm password</label>
                            <input ref={confirmPasswordRef} className="input" type="password" name="confirm-password" id="confirm-password" />
                            {cofirmPasswordErr ? <div className="error-text">{cofirmPasswordErr}</div> : <div></div>}
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
