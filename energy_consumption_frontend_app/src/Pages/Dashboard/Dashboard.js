import React from "react";
import { useParams } from "react-router-dom"
import Chart from "../../Components/Chart/Chart";
import "./Dashboard.css"

const Dashboard = ({currentUser, currentUserRole}) => {

    let {username} = useParams();

    if(currentUser === username && currentUser !== "" && currentUserRole !== "administrator") {

        return (

            <div>

                <div>Dashboard {username}</div>
                <Chart currentUser={currentUser}/>
            </div>
    
        );
    }
    else {

        return (

            <div className="notLoggedInMessage">You are not logged in!</div>
        )
    }
    
}

export default Dashboard;