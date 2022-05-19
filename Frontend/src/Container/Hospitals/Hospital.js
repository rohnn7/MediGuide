import React, { useEffect, useState } from "react";
import classes from './Hospital.module.css'
import * as actions from '../../Store/Action/actions'
import { connect} from 'react-redux'


const Hospital = (props) =>{

    const [hospital, setHospital] = useState(null)

    const onChoose = ()=>{
        if(localStorage.getItem('pk')){
            const authData = {
                'doctor':localStorage.getItem('pk'),
                'work_place':hospital
            }
            props.onDoctor(authData)
        }else{
            alert('User id not specified')
        }
    }

    const onChange = e=>{
        setHospital(e.target.value)
    }

    useEffect(()=>{
        props.onHospital()
    },[])

    let hospitals = null
    if(props.hospitals){
        if(Array.isArray(props.hospitals)){
           hospitals =  props.hospitals.map(hospital=>
                            (<option key={hospital.hospital} value={hospital.pk} >{hospital.hospital}</option>)   
                        )
        }
    }

    if(props.doctor){
        props.history.push('/result')
    }

    return(
        <div className={classes.loginContainer} >
            <div className={classes.headingContainer} >
                Choose Hospitals
            </div>
            <div className={classes.inputContainer} >
                <select className={classes.input} onChange={(event)=>onChange(event)} placeholder='Enter email' >
                    {hospitals}
                </select>
            </div>
            <div className={classes.buttonContainer} >
                <button className={classes.button} onClick={onChoose}  >Choose</button>
            </div>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        test:state.main.test,
        hospitals:state.main.hospitals,
        doctor:state.main.doctor
    }
}

const mapDispatchToProps = dispatch=>{
    return{
       onTest:()=>dispatch(actions.test()),
       onHospital:()=>dispatch(actions.onHospital()),
       onDoctor:(authData)=>dispatch(actions.onDoctor(authData))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)( Hospital)