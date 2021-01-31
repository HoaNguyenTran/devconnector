import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import history from "../../../utils/helper/history"

export default function ProtectedRoute({ component: Component, ...rest }) {
    const [auth, setAuth] = useState(true);

    return (
        <Route {...rest} render={props => 
            {
                if(auth) {
                    return <Component/>
                }
                else {
                    props.history.push("/")
                }
            }
        } />
    )
}
