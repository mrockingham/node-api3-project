import React from 'react'

const user = (props) => {
    return (
        <div>
            {props.user.map(users=>{
                return(
                    <div>{users.name}</div>
                )
            })}
        </div>
    )
}

export default user
