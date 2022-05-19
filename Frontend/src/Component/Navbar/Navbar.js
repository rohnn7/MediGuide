import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

const UserNavbar= props=>{
    const [home, setHome] = useState(true)
    const [logout, setLogout] = useState(false)
    const [blogs, setBlogs] = useState(false)


    const onHomeHandler = ()=>{
        setHome(true)
        setLogout(false)
        setBlogs(false)
    }

    const onPostsHandler = ()=>{
        setHome(false)
        setLogout(false)
        setBlogs(true)
    }

    const onSeriesHandler = ()=>{
        setHome(false)
        setLogout(true)
        setBlogs(false)
    }


    var classnames=''
    if(props.show){
         classnames=classes.container
    }else if(props.show===false && props.initial===false){
         classnames=classes.content
    }

   return(
        <div>
            
            <div className={classes.navbatContainer} >
                <div  className={classes.logo}>
                    Mediguide
                </div>
                <div className={classes.navbar}>
                    <div className={classes.navbaritems}>
                        <Link onClick={onHomeHandler} className={`${classes.navbaritem} ${classes.circleScaleBtn} `} to="/Result" smooth><p  className={`${home? classes.active:''}`}>Home</p></Link>
                        {/* <Link onClick={onPostsHandler} className={`${classes.navbaritem} ${classes.circleScaleBtn}`} to="/blogs" smooth><p  className={`${blogs? classes.active:''}`}>Blogs</p></Link> */}
                        <Link onClick={onSeriesHandler} className={`${classes.navbaritem} ${classes.circleScaleBtn}`} to="/" smooth><p  className={`${logout? classes.active:''}`}>Logout </p></Link>
                        {localStorage.getItem('pk')? <li className={`${classes.navbaritem} ${classes.icon} `}><i className="fa fa-user-circle"  aria-hidden="true"></i>  Rohnn </li>:null}
                    </div>
                </div>
                {/* <nav className={classes.navbar1}>
                    <ul className={classes.navbaritems}>                    
                        <li onClick={this.onMenuClickedHandler} className={`${classes.navbaritem} ${classes.menu} `}><a href='#home' className={`${classes.bar}`}><i className={`fa fa-bars `} aria-hidden="true"></i> </a></li>
                    </ul>
                </nav> */}
            </div>
       
        </div>
        
   )
}

export default UserNavbar;
