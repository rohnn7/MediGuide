import React, { useState } from "react";
import classes from './Sign.module.css'
import * as actions from '../../Store/Action/actions'
import { connect} from 'react-redux'
import Login from "../../Component/Login/Login";
import Register from "../../Component/Register/Register";

const Sign = (props)=>{
    const [flag, setFlag] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const onRegister = ()=>{
        setFlag(false)
    }

    const onLogin = () =>{
        setFlag(true)
    }

    const onSign = () =>{
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(firstName)
        console.log(lastName)
        if(flag===true){
            const authData = {
                'email':email,
                'password':password
            }
            props.onLogin(authData)
        }else{
            const authData = {
                'first_name':firstName,
                'last_name':lastName,
                'email':email,
                'username':username,
                'password':password,
                'is_staff':false
            }
            props.onRegister(authData)
        }
        // setTimeout(()=>(
        //     props.history.push('/result')
        // ),500)
    }

    if(props.register){
        props.history.push('/choose') 
    }

    if(props.login){
        props.history.push('/result') 
    }

    const onInputChange = (e, field) =>{
        if(field==='username'){
            setUsername(e.target.value) 
        }
        
        if(field==='password'){
            setPassword(e.target.value)
        }
        if(field==='firstname'){
            setFirstName(e.target.value)
        }
        if(field==='lastname'){
            setLastName(e.target.value)
        }
        if(field==='email'){
            setEmail(e.target.value) 
        }
    }

    return(
        <div className={classes.signContainer} >
            {flag?(<Login switch={onRegister}
                          sign = {onSign}
                          change = {onInputChange} />):(<Register switch={onLogin}
                                                         sign = {onSign} 
                                                         change = {onInputChange} />)}
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        test:state.main.test,
        register:state.main.register_user,
        login:state.main.login_user
    }
}

const mapDispatchToProps = dispatch=>{
    return{
       onTest:()=>dispatch(actions.test()),
       onLogin:(authData)=>dispatch(actions.onLogin(authData)),
       onRegister:authData=>dispatch(actions.onRegister(authData))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Sign);

