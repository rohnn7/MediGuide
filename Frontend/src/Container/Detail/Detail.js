import React, { useEffect, useState } from "react";
import classes from './Detail.module.css'
import * as actions from '../../Store/Action/actions'
import { connect} from 'react-redux'
import UserNavbar from "../../Component/Navbar/Navbar";
import {FaPlus,FaMinus} from 'react-icons/fa'

const Detail = (props)=>{

    const [imagePreview, setImagePreview] = useState(null)
    const [image, setImage] = useState(null)
    const [flag, setFlag] = useState(false)
    const [counter, setCounter] = useState(1)



    const server = 'http://127.0.0.1:8000/media/Results/'

    
    return(
        <>
            <UserNavbar/>
            <div className={classes.detailContainer} >
                <img className={classes.preview} src={server+props.match.params.id +'.jpeg'} alt="Image"/>
                <div className={classes.solutionContainer} >
                    <h1 className={classes.heading} >Diagnosis</h1>
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                   
                    </p>
                    <h1 className={classes.heading} >Refrences</h1>
                    <p>
                        [1] Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's<br/>
                        [2] standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br/>
                        [3] It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br/>
                        [4] It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p>
                </div>
            </div>
        </>
    )
}

const mapStateToProps=state=>{
    return{
        test:state.main.test,
        image:state.main.image,
        results:state.main.results
    }
}

const mapDispatchToProps = dispatch=>{
    return{
       onTest:()=>dispatch(actions.test()),
       onImage:authData=>dispatch(actions.onImage(authData)),
       onResults: authData=>dispatch(actions.onResult(authData))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Detail);

