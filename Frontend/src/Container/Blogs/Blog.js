import React, { useEffect, useState } from "react";
import classes from './Blog.module.css'
import * as actions from '../../Store/Action/actions'
import { connect} from 'react-redux'
import UserNavbar from "../../Component/Navbar/Navbar";
import {FaPlus,FaMinus} from 'react-icons/fa'
import Card from '../../Component/Cards/Card'

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
                <Card immage= {1} date={-1} />

                <Card immage= {2} date={-1} />
                <Card immage= {3} date={-1} />
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

