import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast';
import {useCookies} from 'react-cookie';


import logo from '../../assets/logo.png'

const Home2 = () =>{
    const history = useHistory()
    
    const [loginStatus, setLoginStatus, removeLoginStatus] = useCookies()

    const [signedIn, setSignedIn] = useState<boolean>(false)
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false)

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState<string>('')
    const [toastTitle, setToastTitle] = useState<string>('')
    const [toastClassName, setToastClassName] = useState<string>('')
    const toggleShowToast = () => setShowToast(!showToast)

    useEffect(() =>{
        const cookie = loginStatus;
        if(!cookie.loginStatus){
            history.push('/')
        }else{
            setSignedIn(true)
        }
    })

    function showToastFunction(message: string, code: number){
        setShowToast(true);
        setToastMessage(message);
        if(code === 2){
            setToastTitle('Sucesso!');
            setToastClassName('bg-success text-light')
        }else{
            setToastTitle('Erro!');
            setToastClassName('bg-danger text-light');
        }
    }

    function handleLogout(){
        removeLoginStatus("loginStatus")
        setSignedIn(false)
        history.push('/')
    }
    
    return(
        <>
                <Toast show={showToast} onClose={toggleShowToast} delay={5000} autohide style={{position: 'fixed', bottom: 0, right: 0, zIndex: 999, maxWidth: '200px'}}>
                <Toast.Header className={toastClassName} >
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{toastTitle}</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>

            {signedIn &&
                <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded pt-3 pb-3">
                    
                    <div className="row justify-content-center mt-4 mb-5">
                        <p className="h1" style={{color: "rgba(227, 32, 49, 1)"}}>Welcome</p>
                        
                        <div className="row justify-content-center mt-3 mb-2">
                            <img src={logo} style={{width:'48%', height: '96%'}} alt="logo"/>
                        </div>

                        <button onClick={handleLogout} className="btn btn-danger">
                            Logout
                        </button>

                    </div>

                </div>
            }  
        </>
        
    )
}



export default Home2