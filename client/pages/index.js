import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";



const Home = () => {
    const [state, setState] = useContext(UserContext);
    
    const router = useRouter();

    const clickButton = () => {
        if(state){
            router.push('/user/dashboard')
        } else{
            router.push('/login')
        }
      };
    return(
        <>
        <div className="container-fluid"
        style={{
            backgroundImage: "url('/images/home.png')",
            backgroundAttachment: "fixed",
            padding: "300px 0px 75px"
        }}
        >  
        </div>
        <h1 className="display-1  text-center" style={{color: "#e63946"}}>Social future</h1>
        <div className="display-4 text-center">
            <button onClick={clickButton} className="p-3" style={{color: "#457b9d", borderRadius: "20%", border: "2px solid"}}>Let`s go</button>
        </div>
        </>
       
    );
}

export default Home;