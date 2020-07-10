import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Landing from './popup/landing_popup.png';
import Login from './popup/login_popup.png';
import Otp from './popup/otp_popup.png';
import Register from './popup/register_popup.png';
import Password from './popup/password_popup.png';
import Hidden from '@material-ui/core/Hidden';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme=>({
    root: {
        position: 'fixed',
        height: '100%',
        width:'100%',
        left: '0%',
        top: '0%',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0, 0.86)',
        [theme.breakpoints.down('md')]:{
            padding:'0px 10px'
        },
    },
    frame:{
        height:'140%',
        width:'150%',
        transform:'scale(0.72)',
        marginTop:'-94px',
        marginLeft:'-110px',
        [theme.breakpoints.down('sm')]:{
            height:'100%',
            width:'100%',
            transform:'scale(1)',
            marginLeft:'0px',
            marginTop:'0px'
        },
    },
    popup:{
        backgroundColor:'white',
        height:'75%',
        width:'70%',
        top:'15%',
        left:'15%',
        position:'fixed',
        display:'flex',
        [theme.breakpoints.down('sm')]:{
            height:'90%',
            width:'96%',
            top:'5%',
            left:'2%',
        },

    },
    frameWrap:{
        height:'100%',
        width:'50%',
        backgroundColor:'white',
        overflow:'hidden',
        [theme.breakpoints.down('sm')]:{
            width:'100%'
        },
    },
    popupCancelIcon:{
        position:'fixed',
        top:'5%',
        right:'3%',
        zIndex:'99',
        [theme.breakpoints.up('sm')]:{
            display:'none'
        },
    }
    
}));

const PopUp=({popupUrl,OnpopupCancelled})=>{
    const classes=useStyles();
    const [page,setPage]=React.useState('landing');
    useEffect(()=>{
        // let uiWindow=document.getElementById('popup-frame').contentWindow;
        // console.log(uiWindow);
        // uiWindow.addEvent

    });
    let srcImage;
    window.addEventListener('message',(event)=>{
        if(event.data.pageType){
            setPage(event.data.pageType);
        }else if(event.data.redirectUrl){
            window.location.href=event.data.redirectUrl;
        }
    });
    switch(page){
    case 'landing': srcImage=Landing;
        break;
    case 'otp': srcImage=Otp;
        break;
    case 'password': srcImage=Password;
        break;
    case 'register': srcImage=Register;
        break;
    case 'login': srcImage=Login;
        break;
    }
    return(
        <div className={classes.root} >
            <IconButton onClick={()=>OnpopupCancelled()} className={classes.popupCancelIcon}>
                <ClearIcon style={{color:'black'}}/>
            </IconButton>  
            <div className={classes.popup}>
                <div className={classes.frameWrap}>
                    <iframe id='popup-frame' className={classes.frame} src={popupUrl} /> 
                </div>
                <Hidden smDown>
                    <div style={{height:'100%',width:'50%'}}>
                        <IconButton onClick={()=>OnpopupCancelled()} style={{position:'fixed',left:'81%'}}>
                            <ClearIcon style={{color:'white'}}/>
                        </IconButton>
                        <img className={classes.image} src={srcImage} style={{height:'100%',width:'100%'}}/>
                    </div>
                </Hidden>
            </div>
        </div>
    );
};

export default PopUp;