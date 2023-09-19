import classes from "./Users.module.css";
import pheodosij from "../../images/defaultAva.jpg";
import React from "react";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div className={classes.user}>
        <div className={classes.page}>
            {pages.map(p => {
                return <span className={props.currentPage === p ? classes.selectedPage : ''}
                             onClick={() => props.onPageChange(p)}>{p}</span>
            })}
        </div>
        {props.usersData.map(user => <div key={user.id}>

                <span>
                    <div>
                        <img src={user.photos.small != null ? user.photos.small : pheodosij}/>
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => {
                                props.unfollow(user.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(user.id)
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

export default Users