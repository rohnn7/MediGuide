import React from "react";
import classes from './Card.module.css'

const Card = (props) =>{
    
    const server = 'http://127.0.0.1:8000/media/Results/'
    return(
        <div className={classes.bigBlogCardContainer} >
        <div className={classes.bigBlogTitleImage} >
            <img src={server+props.image+'.jpeg'} alt='alt' className={classes.bigBlogImage}  />
        </div>
        <div className={classes.bigBlogCardContent} >
            <div className={classes.subHeadContainer} >
                <p className={classes.series} >medical diagnosis]</p>
                <p className={classes.date} >{props.date>0?Date.now():'Not Published'}</p>
            </div>
        </div>
    </div>
    )
}

export default Card