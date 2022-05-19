import React, { useEffect, useState } from "react";
import classes from './Result.module.css'
import * as actions from '../../Store/Action/actions'
import { connect} from 'react-redux'
import UserNavbar from "../../Component/Navbar/Navbar";
import {FaPlus,FaMinus} from 'react-icons/fa'
import { Link } from "react-router-dom";
import {Bar, Doughnut, Pie, Line, Radar} from 'react-chartjs-2';

const Result = (props)=>{

    const [imagePreview, setImagePreview] = useState(null)
    const [image, setImage] = useState(null)
    const [flag, setFlag] = useState(false)
    const [counter, setCounter] = useState(1)
    const [type, setType] = useState('Image')

    const onImagePreview = (e)=>{
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image = e.target.files[0]
        setImage(image)
        setImagePreview(image_as_base64)

    }
 

    let server = null
    if(type==='Image'){
        server = 'http://127.0.0.1:8000/media/Results/'
    }else if(type==='ECG'){
        server = 'http://127.0.0.1:8000/media/Results_ECG/'
    }
  

    const onChangeCounter = count =>{
        if(count===1){
            if(counter>=4){
                return;
            }
            else{
                setCounter(counter+count)
            }
        }else if(count===-1){
            if(counter<=1){
                return
            }
            else{
                setCounter(counter+count)
            }
        }
    }

    const onUpload = ()=>{
        if(image){
            const authData = new FormData()
            authData.append('cover_image', image)
            // props.onImage(authData)
            const dummy = {
                'result':'Hi there'
            }


            if(type==='Image'){
                props.onResults(dummy)
            }else if(type==='ECG'){
                props.onResults_ecg(dummy)
            }
            setTimeout(()=>setFlag(true),3000)
        }
    }

    
    let images = null
    if(props.results){
        console.log(JSON.parse(props.results.result))
    }

    let results = null

    if(counter===1){
        images = (
            <>
            <Link to='/solution/0' > <img className={classes.preview} src={server+'0.jpeg'}  alt="Image"/></Link>
            </>
        )
    }else if(counter===2){
        images = (
            <>
            
            <Link to='/solution/0' ><img className={classes.preview} src={server+'0.jpeg'}  alt="Image"/></Link>
            <Link to='/solution/1' ><img className={classes.preview} src={server+'1.jpeg'} alt="Image"/></Link>
            </>
        )
    }else if(counter===3){
        images = (
            <>
            
            <Link to='/solution/0' > <img className={classes.preview} src={server+'0.jpeg'}  alt="Image"/></Link>
            <Link to='/solution/1' ><img className={classes.preview} src={server+'1.jpeg'} alt="Image"/></Link>
            <Link to='/solution/2' ><img className={classes.preview} src={server+'2.jpeg'} alt="Image"/></Link>
            </>
        )
    }else if(counter===4){
        images = (
            <>
            
            <Link to='/solution/0' ><img className={classes.preview} src={server+'0.jpeg'}  alt="Image"/></Link>
            <Link to='/solution/1' ><img className={classes.preview} src={server+'1.jpeg'} alt="Image"/></Link>
            <Link to='/solution/2' ><img className={classes.preview} src={server+'2.jpeg'} alt="Image"/></Link>
            <Link to='/solution/3' ><img className={classes.preview} src={server+'3.jpeg'} alt="Image"/></Link>
            </>
        )
    }




    return(
        <>
            <UserNavbar/>
            <div className={classes.resultContainer} >
                <div className={classes.resultHeading} >
                    {flag?"Results":"Upload image"}
                </div>
                <div className={classes.imageContainer} >
                    {imagePreview? <img className={classes.preview} src={imagePreview} alt="Image"/>:null}
                </div>
                <div className={classes.inputContainer} >
                    <div className={classes.fileUpload} >
                        <input className={classes.upload} type='file' onChange={(event)=>{onImagePreview(event)}}/>
                        <lable className={classes.label} >{flag? "Choose new" :"choose"}</lable>
                    </div>
                    <select value={type} onChange={(event)=>setType(event.target.value)} >
                        <option value='Image' >Image</option>
                        <option value='ECG' >ECG</option>
                    </select>
                    <button className={classes.button} onClick={onUpload} > Upload </button>
                </div>
                <div className={classes.compareCounterContainer} >
                    <p className={classes.compareCounterDes} >Number of results:</p>
                    <FaMinus className={classes.counterIcon} onClick={()=>onChangeCounter(-1)} />
                    <p className={classes.compareCounter} >{counter}</p>
                    <FaPlus className={classes.counterIcon} onClick={()=>onChangeCounter(1)} />
                </div>
                <div className={classes.imageContainer} >
                    {flag?images  : null  }
                </div>
                {flag? <div className={classes.analysisContainer} >
                    <div className={classes.radar} >
                    <Radar
                        data={
                            {
                                labels: [
                                  'Relevancy',
                                  'Solutions available',
                                  'Ease',
                                  'Community',
                                  'Surity'
                                ],
                                datasets: [{
                                  label: 'My First Dataset',
                                  data: [85, 81, 67, 85, 96],
                                  fill: true,
                                  backgroundColor: 'RGBA(35,134,242,0.5)',
                                  borderColor: 'RGBA(35,134,242,1)',
                                  pointBackgroundColor: 'rgb(255, 99, 132)',
                                  pointBorderColor: '#fff',
                                  pointHoverBackgroundColor: '#fff',
                                  pointHoverBorderColor: 'rgb(255, 99, 132)'
                                }]
                              }
                        }
                        options={
                            {
                                elements: {
                                  line: {
                                    borderWidth: 3
                                  }
                                }
                            }
                        }
                    />
                    </div>


                    <Bar
                        data={
                            {
                                labels: ['Female', 'Male', 'Others'],
                                datasets: [{
                                    label: `Gender demographics over the query data`,
                                    data: [173, 368, 79],
                                    backgroundColor:'RGBA(52,255,129,0.9)',
                                    borderColor:'RGBA(52,255,129,0.9)',
                                    borderWidth: 1,
                                    borderRadius:2,
                                    hoverBackgroundColor:'RGBA(52,255,129,0.8)'
                                }]
                            }
                        }
                        options={
                            {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        
                        }
                    />
                    <br/><br/>
                    <Bar
                        data={
                            {
                                labels: ['0-15 yrs', '15-30 yrs', '30-45 yrs','45-60 yrs', '60-100yrs' ],
                                datasets: [{
                                    label: `Age demographics over the query data`,
                                    data: [73, 257,133,369, 211 ],
                                    backgroundColor:'RGBA(255,99,132,0.9)',
                                    borderColor:'RGBA(255,99,132,0.9)',
                                    borderWidth: 1,
                                    borderRadius:2,
                                    hoverBackgroundColor:'RGBA(255,99,132,1)'
                                }]
                            }
                        }
                        options={
                            {
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        
                        }
                    />
                    
                </div>:null}
            </div>
        </>
    )
}

const mapStateToProps=state=>{
    return{
        test:state.main.test,
        image:state.main.image,
        results:state.main.results,
        results_ecg:state.main.results_ecg
    }
}

const mapDispatchToProps = dispatch=>{
    return{
       onTest:()=>dispatch(actions.test()),
       onImage:authData=>dispatch(actions.onImage(authData)),
       onResults: authData=>dispatch(actions.onResult(authData)),
       onResults_ecg: authData=>dispatch(actions.onResultECG(authData))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Result);

