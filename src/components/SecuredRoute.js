import React, { Component, useContext, useEffect } from "react";
import { Navigate, Route } from "react-router";
import { LoginComponent } from "./LoginComponent";
import { UserContext } from "./UserContext";

const SecuredRoute =({children}) => {
    const usercontext = useContext(UserContext);
    useEffect(()=> {
        console.log('usersessions: ', usercontext)
    },[])
    return (
      <React.Fragment>
        {usercontext.isUserLoggedIn || usercontext.isUserLoggedIn==='true' ? 
          <>
            <main className="relative">
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 overflow-auto top-10">
                {children}
              </div>
            </main>
          </>
         : 
          <Navigate to="/login" />
        }
      </React.Fragment>
    );
}
export default SecuredRoute;