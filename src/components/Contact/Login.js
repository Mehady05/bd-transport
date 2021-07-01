import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import './Login.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import NavArea from '../CommonItems/NavArea/NavArea';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const Login = () => {
    
    const [login, setLogin] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };



    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignIn: false,
        name:"",
        email:"",
        password:"",
        error:"",
        success: false
    });
    console.log(user.email);

   




    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogle = ()=>{
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            const {displayName, email} = user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
            }
            setUser(signInUser);
            console.log(signInUser);
          
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    };


    const handleChange = (e)=>{
        let isFieldValid = true;
        if(e.target.name === "email"){
            isFieldValid = /^\S+@\S+\.\S+$/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user}
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
        
    }

    const handleSubmit = (e)=>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                console.log(res);
                const newUserInfo = {...user};
                newUserInfo.error = "";
                newUserInfo.success = true;
                setUser(newUserInfo)
            })
            .catch((error) => {  
                const errorMessage = error.message;
                const newUserInfo = {...user};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setUser(newUserInfo)
                console.log(errorMessage);
            });
            
        };
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                console.log(res);
                const newUserInfo = {...user};
                newUserInfo.error = "";
                newUserInfo.success = true;
                setUser(newUserInfo)
                setLogin(newUserInfo)
                history.replace(from);
            })
            .catch((error) => {  
                const errorMessage = error.message;
                const newUserInfo = {...user};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setUser(newUserInfo)
                console.log(errorMessage);
            });
        }
        e.preventDefault();
        
    };



    return (
        <div className="nav_area">
            <NavArea></NavArea>
            <div className="container py-5">
                    <div className="row  d-flex align-items-center justify-content-center">
                        <div className="col-md-5">
                            <div className="form_all text-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="account text-left">
                                        <p>Create an account</p>
                                    </div>
                                    {newUser && <div className="name line">
                                        <input class="form-control" type="text" name="name" id="" onBlur={handleChange} placeholder="your name"/>    
                                    </div>}
                                    <div className="email line">
                                        <input class="form-control" type="email" name="email" id="" onBlur={handleChange} placeholder="your email"/>
                                    </div>  
                                    <div className="password line">
                                            <input class="form-control" type="password" name="password" id="" onBlur={handleChange} placeholder="Enter your password"/>
                                    </div>
                                    
                                    <div className="submit_btn">
                                        <input class="form-control new" type="submit" value={newUser ? 'Create New Account' : 'Login'} />
                                    </div>
                                    <div className="already_account d-flex justify-content-around align-item-center py-3">
                                        <div className="is_new_!">
                                            <p>{newUser?'Already have an account?':"Don't have an account?"}</p>
                                        </div>
                                    <div className="btn_is_new_!">
                                            <button onClick={()=>{setNewUser(!newUser)}}>{newUser? 'Login': 'Create an account'}</button>
                                    </div>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div> 
                    <p className="text-center or">or</p>
                    <div className="row d-flex align-items-center justify-content-center py-4">
                        <div className="col-md-3">
                            <div className="google_button">
                                    <button  class="form-control button" onClick={handleGoogle}>Continue with Facebook</button>
                                </div>
                                <div className="google_button py-3">
                                    <button  class="form-control button" onClick={handleGoogle}>Continue with Google</button>
                                </div>
                            </div>
                    </div>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>user {newUser ? "created" : "logged In"} successfully</p>}
            </div>
        </div>
    );
};

export default Login;