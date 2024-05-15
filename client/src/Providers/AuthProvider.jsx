import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types'; // ES6

import { createContext, useEffect, useState } from "react"
import auth from '../Components/Auth/firebase';


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

  
    // sate user
    const [user, setuser] = useState('')

    // loading state
    const [loading, setLoading] = useState(true)

    // create user
    const createUser  = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // signIn user with email and password
    const signInUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    // sigin with google
    const provider = new GoogleAuthProvider()
    const signWithGoogle = () => {
        return signInWithPopup(auth,provider)
    }
    
    // logotu user
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // user  observer
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currenUser => {
              console.log('user state change of : ',currenUser);
              setuser(currenUser)
              setLoading(false)
          })
          return ()=> {
              unSubscribe()
          }
      },[])

    // passing the data on context
    const authInfo = {
        createUser,
        user,
        loading,
        signInUser,
        logOut,
        signWithGoogle
    }


  return (
    <AuthContext.Provider value={authInfo} >
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider
AuthProvider.propTypes = {
    children: PropTypes.node,

}