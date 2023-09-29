import classes from './Users.module.css';
import defaultAva from '../../images/defaultAva.jpg';
import React from 'react';
import {NavLink} from 'react-router-dom';

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div className={classes.user}>
        <div className={classes.page}>
            {pages.map(p => {
                return <span className={props.currentPage === p ? classes.selectedPage : ''} key={p.id}
                             onClick={() => props.onPageChange(p)}>{p}</span>
            })}
        </div>
        {props.usersData.map(user => <div key={user.id}>

                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : defaultAva}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ? <button
                                disabled={props.followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    props.unfollow(user.id)
                                }}
                            >Unfollow</button>

                            : <button
                                disabled={props.followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    props.follow(user.id)
                                }}
                            >Follow</button>}
                    </div>
                </span>
            <span>
                <div>{user.name}</div><div>{user.status}</div>
            </span>

        </div>)}
    </div>
}

export default Users