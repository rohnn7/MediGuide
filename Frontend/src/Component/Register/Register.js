import React from "react";
import classes from './Register.module.css'

const Register = (props) =>{
    return(
        <div className={classes.loginContainer} >
            <div className={classes.headingContainer} >
                Sign Up 
            </div>
            <div className={classes.inputContainer} >
                <label>First Name: </label><br/>
                <input className={classes.input} onChange={(event)=>props.change(event,'firstname')} placeholder='Enter your first name' />
            </div>
            <div className={classes.inputContainer} >
                <label>Last Name: </label><br/>
                <input className={classes.input} onChange={(event)=>props.change(event,'lastname')} placeholder='Enter your last name' />
            </div>
            <div className={classes.inputContainer} >
                <label>Email: </label><br/>
                <input className={classes.input} onChange={(event)=>props.change(event,'email')} placeholder='Enter email' />
            </div>
            <div className={classes.inputContainer} >
                <label>Username: </label><br/>
                <input className={classes.input} onChange={(event)=>props.change(event,'username')} placeholder='Choose an username' />
            </div>
            <div className={classes.inputContainer} >
                <label>Password: </label><br/>
                <input className={classes.input} security={'password'} onChange={(event)=>props.change(event,'password')} placeholder='Enter password' />
            </div>

            <div className={classes.switchContainer} onClick={props.switch} >
                <p>Already have an account?</p>
            </div>
            <div className={classes.buttonContainer} >
                <button className={classes.button}  onClick={props.sign} >Sign Up</button>
            </div>
        </div>
    )
}

export default Register