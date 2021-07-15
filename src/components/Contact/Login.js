import React, { useContext } from 'react';
import NavArea from '../CommonItems/NavArea/NavArea';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
if (firebase.apps.length ===0){
    firebase.initializeApp(firebaseConfig);}



const Login = () => {

    const [login, setLogin] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        success: false
    })
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                }
                console.log(res.user)
                setUser(signedInUser);

            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbIn = ()=> {
        firebase.auth().signInWithPopup(fbProvider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log('fb user after sign in', user);
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;

        if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if(e.target.name === 'password' && e.target.name === 'confirm_password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber =  /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
        }

    
        if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
        }
    }


    const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then( res => {
              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              updateUserName(user.name);
            })
            .catch( error => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
          }
      
          if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              setLogin(newUserInfo);
              history.replace(from);
            })
            .catch(function(error) {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
            });
        }
        e.preventDefault();
    }
    
    const updateUserName = name =>{
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('user name updated successfully')
        }).catch(function(error) {
          console.log(error)
        });
      }
    
    return (
        <div>
            <NavArea></NavArea>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            {newUser && <div className="form-group">
                                <label htmlFor="Name">Name</label>
                                <input onBlur={handleBlur} type="text" name="name" id="" class="form-control" placeholder="Enter Name" />
                            </div>}
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input onBlur={handleBlur} type="text" name="email" id="" class="form-control" placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input onBlur={handleBlur} type="text" name="password" id="password" class="form-control" placeholder="Enter Password" />
                            </div>
                            {newUser && <div className="form-group">
                                <label htmlFor="Password">Confirm Password</label>
                                <input onBlur={handleBlur} type="text" name="confirm_password" id="confirm_password" class="form-control" placeholder="Enter Password" />
                            </div>}
                            {!newUser && <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>}
                            <br />
                            <div className="form-check text-center">
                                <input type="submit" value={newUser?"Create an account":"Login"}/>
                            </div>
                            <br />
                            <div className="login text-center">
                                <span>{newUser?"Already Have An Account?":"Don't have an account?"}</span>
                                <input onClick={()=> setNewUser(!newUser)} type="button" value={newUser?"Login":"Create an account"}/>
                            </div>
                            
                        </form>

                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12 text-center">
                        <button onClick={handleFbIn}>FaceBook Sign In</button>
                    </div>
                    <div className="col-md-12 text-center py-2">
                        <button onClick={handleGoogleSignIn}>Google Sign In</button>
                    </div>
                </div>
            </div>
            <p style={{color: 'red'}}>{user.error}</p>
            { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
        </div>
    );
};

export default Login;