import React, { useRef, useEffect, useState } from 'react';
import "./Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faInfoCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/;
const REGISTER_URL = '/register';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd])

        const handleSubmit = async (e) => {
            e.preventDefault();
            //if button enabled with JS hack
            const v1 = USER_REGEX.test(user);
            const v2 = PWD_REGEX.test(pwd);
            if(!v1 || !v2) {
                setErrMsg("invalid Entry");
                return;
            }
            setSuccess(true)
            // try {
            //     const response = await axios.post(REGISTER_URL, 
            //         JSON.stringify({user, pwd}),
            //         {
            //         headers: { 'Content-type': 'application/json' },
            //         witCredentials: true
            //         } );
            //         console.log(response.data);
            //         console.log(response.accessToken);
            //         console.log(JSON.stringify(response));
            //         setSuccess(true);
            //         //clear the input fields
            // } catch (err) {
            //     if(!err?.response) {
            //         setErrMsg('No server Response');
            //     }else if(err.response?.status === 409) {
            //         setErrMsg('Username Taken');
            //     }else{
            //         setErrMsg('Registration Failed')
            //     }errRef.current.focus();
            // }
        }
    return (
        <>
        {success ? (
            <section>
                <h2>Registration Successful</h2>
                <p>
                    <a href='#'>Sign in</a>
                </p>
            </section>
        ) : (
        <section className='register-container'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                <label htmlFor="username" className='label'>
                    Username: 
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    </label>
                    <input
                        className='form-input'
                        type='text'
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                
                <div>
                <label htmlFor='password' className='label'>
                        Password: 
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        className='form-input'
                        type='password'
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby='pwdnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id='pwdnote' className={pwdFocus && !validPwd ?"instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and character.<br />
                        Allowed special characters: <span aria-label='exclamation mark'>!</span>
                        <span aria-label='at symbol'>@</span>
                        <span aria-label='hash tag'>#</span>
                        <span aria-label='dollar sign'>$</span>
                        <span aria-label='percent'>%</span>
                    </p>
                </div>

                <div>
                    <label htmlFor='confirm_pwd' className='label'>
                        Confirm Password: 
                    <span className={validMatch && matchPwd ?  "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        className='form-input'
                        type='password'
                        id='confirm_pwd'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby='confirmNote'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id='confirmNote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                </div>
                    
                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                        Sign up
                    </button>
            </form>
            <p>
                Already registered?<br />
                <span>
                    {/*put router link here*/}
                    <a href="#">sign in</a>
                </span>
            </p>
        </section>
        )}
        </>
    );                            
};

export default Register;
