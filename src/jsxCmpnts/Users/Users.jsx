import React from "react";
import pheodosij from "../../images/pheodosij.jpg";
import classes from "./Users.module.css";

const Users = (props) => {

    if (props.usersData.length === 0) {
        props.setUsers([{
            id: 1,
            followed: false,
            name: "Theodosius",
            status: "Emperor",
            location: {
                city: "Constantinople",
                country: "Eastern Roman Empire"
            }
        }, {
            id: 2,
            followed: false,
            name: "Bleda",
            status: "Brother of Attila",
            location: {
                city: 'steppe',
                country: 'Hunnic Empire'
            }
        }, {
            id: 3,
            followed: true,
            name: "Ellac",
            status: "Son of Attila",
            location: {
                city: 'steppe',
                country: 'Hunnic Empire'
            }
        }, {
            id: 4,
            followed: false,
            name: "Flavius",
            status: "Warlord",
            location: {
                city: 'Ravenna',
                country: 'Western Roman Empire'
            }
        },])

    }


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
                        <div>{user.location.country}</div><div>{user.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users