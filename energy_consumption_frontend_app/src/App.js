import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Navbar from './Navbar/Navbar';
import ManageDevices from "./Pages/ManageDevices/ManageDevices";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";


function App() {

    const [currentUser, setCurrentUser] = useState("");
    const [currentUserRole, setCurrentUserRole] = useState("");
    const [currentUserDevices, setCurrentUserDevices] = useState([]);
    const [users, setUsers] = useState([]);

    return (

      <React.StrictMode>
        <div>
          
            <BrowserRouter>

              <Navbar currentUser={currentUser} currentUserRole={currentUserRole}/>

              <Routes>
                <Route path='/authentication/login' element={<Login setUsers={setUsers} setCurrentUser={setCurrentUser} setCurrentUserRole={setCurrentUserRole} setCurrentUserDevices={setCurrentUserDevices}/>}/>
                <Route path='/authentication/register' element={<Register/>}/>
                <Route path='/dashboard/:username' element={<Dashboard currentUser={currentUser} currentUserRole={currentUserRole}/>}/>
                <Route path='/managedevices/:username' element={<ManageDevices currentUser={currentUser} currentUserRole={currentUserRole} currentUserDevices={currentUserDevices} setCurrentUserDevices={setCurrentUserDevices}/>}/>
                <Route path='/manageusers' element={<ManageUsers currentUser={currentUser} users={users} setUsers={setUsers}/>}/>
              </Routes>
            </BrowserRouter>
          
        </div>
      </React.StrictMode>

    );
}

export default App;
