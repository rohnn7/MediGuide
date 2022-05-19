import React from "react";
import classes from './Login.module.css'

const Login = (props) =>{
    return(
        <div className={classes.loginContainer} >
            <div className={classes.headingContainer} >
                Sign In 
            </div>
            <div className={classes.inputContainer} >
                <label>Email: </label><br/>
                <input className={classes.input} onChange={(event)=>props.change(event,'email')} placeholder='Enter email' />
            </div>
            <div className={classes.inputContainer} >
                <label>Password: </label><br/>
                <input className={classes.input} security='password' onChange={(event)=>props.change(event,'password')} placeholder='Enter password' />
            </div>

            <div className={classes.switchContainer}  onClick={props.switch} >
                <p>Don't have an account?</p>
            </div>
            <div className={classes.buttonContainer} >
                <button className={classes.button} onClick={props.sign}  >Sign In</button>
            </div>
        </div>
    )
}

export default Login