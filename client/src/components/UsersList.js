import React, {useState, useEffect} from 'react'
import axios from 'axios'
import User from './user'

const UsersList = () => {
    const [user, setUser] =useState([])

    useEffect(()=>{
        axios.get('http://localhost:4000/api/user')
        .then(res=>{
            console.log(res.data    )
            setUser(res.data.data)
            
        })
    },[])

    return (
        <div>
             <User key ={user.id} user={user} />
        </div>
    )
}

export default UsersList
