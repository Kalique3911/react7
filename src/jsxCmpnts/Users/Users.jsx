import classes from './Users.module.css';
import pheodosij from '../../images/defaultAva.jpg';
import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

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
                            <img src={user.photos.small != null ? user.photos.small : pheodosij}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button
                                onClick={() => axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                    withCredentials: true,
                                    headers: {'API-KEY': '12a5bbef-9278-4dc2-ba7a-83b6c77a8a9b'}
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(user.id)
                                        }
                                    })}>Unfollow</button>

                            : <button
                                onClick={() => axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                    withCredentials: true,
                                    headers: {'API-KEY': '12a5bbef-9278-4dc2-ba7a-83b6c77a8a9b'}
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(user.id)
                                        }
                                    })}>Follow</button>}
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
                                    </div>)}
                            </div>
                            }

                            export default Users