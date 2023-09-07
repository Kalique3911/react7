import React from "react";
import pheodosij from "../../images/pheodosij.jpg";
import classes from "./Users.module.css";

const Users = (props) => {
    return <div className={classes.user}>
        {
            props.usersData.map(user => <div key={user.id}>
                <span>
                    <div>
                        <img src={pheodosij}/>
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => {props.unfollow(user.id)}}>Unfollow</button>
                            : <button onClick={() => {props.follow(user.id)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div><div>{user.status}</div>
                    </span>
                    <span>
                        <div>{}</div><div>{}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users