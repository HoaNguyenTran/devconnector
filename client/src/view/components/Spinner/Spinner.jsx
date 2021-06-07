import React from 'react'
import {FadeLoader} from "react-spinners"

const style= {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

export default function Spinner() {
    return (
        <div style={style}>
            <FadeLoader color="#3B49DF"/>
        </div>
    )
}
