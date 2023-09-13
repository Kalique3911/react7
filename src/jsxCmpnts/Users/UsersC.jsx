import React from "react";
import pheodosij from "../../images/pheodosij.jpg";
import classes from "./Users.module.css";
import axios from "axios";

class Users extends React.Component {
    getUsers = () => {
        if (this.props.usersData.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                this.props.setUsers(response.data.items)
            })
        }
    }
    render() {
        return <div className={classes.user}>
            <button onClick={this.getUsers}>Get Users</button>
            {
                this.props.usersData.map(user => <div key={user.id}>

                <span>
                    <div>
                        <img src={user.photos.small != null ? user.photos.small : pheodosij}/>
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => {
                                this.props.unfollow(user.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(user.id)
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
                    <span>
                        <div>{user.name}</div><div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.country'}</div><div>{'user.location.city'}</div>
                    </span>
                </span>
                </div>)
            }
        </div>
    }
}

export default Users