import './Users.css'
import defaultAva from '../../images/defaultAva.jpg'
import React, {memo, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentPage, getFollowingInProgress, getPageSize} from '../../selectors/usersSelectors'
import {setCurrentPage, setToggleIsFollowingProgress} from '../../redux/usersSlice'
import preloader from '../../images/preloader.gif'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'
import {useFollowMutation, useGetUsersQuery, useUnfollowMutation} from '../../API/usersAPI'
import Select from 'react-select'

const Users = props => {
    const dispatch = useDispatch()
    const pageSize = useSelector((state) => getPageSize(state))
    const currentPage = useSelector((state) => getCurrentPage(state))
    const followingInProgress = useSelector((state) => getFollowingInProgress(state))
    const {data: usersData, refetch, isLoading} = useGetUsersQuery({currentPage, pageSize})
    const [follow] = useFollowMutation()
    const [unfollow] = useUnfollowMutation()
    let [searchOptions, setSearchOptions] = useState([])
    let pages = []

    if (usersData) {
        let totalUsersCount = usersData.totalCount
        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
    let pagesOptions = pages.map(p => ({value: `${p}`, label: `${p} page`}))
    const options = [
        {value: 'followed', label: 'only followed'},
        {value: 'ava', label: 'only with ava'},
        {value: 'status', label: 'only with status'}
    ]

    const onPageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber.value))
    }
    const onOptionChange = (option) => {
        setSearchOptions(option)
    }

    if (isLoading) {
        return <img src={preloader} alt={'preloader'}/>
    }

    return <div>
        <Select options={pagesOptions} onChange={onPageChange} className={'react-select-container'}
                classNamePrefix={'custom-select'} placeholder={'Select page'}/>
        <Select options={options} onChange={onOptionChange} className={'react-select-container'}
                classNamePrefix={'custom-select'} placeholder={'Select options'} isMulti={true}/>
        {usersData.items.map(user => {
            if (!user.followed && searchOptions.some(o => o.value === 'followed')) {
                return null
            } if (!user.photos.small && searchOptions.some(o => o.value === 'ava')) {
                return null
            } if (!user.status && searchOptions.some(o => o.value === 'status')) {
                return null
            }
            return <div key={user.id} className={'user'}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : defaultAva} alt={'small photo'}/>
                    </NavLink>
                </div>
                <span className={'uSeparator'}></span>
                <div>{user.name}</div>
                {user.status && <div className={'uStatus'}>{user.status}</div>}
                <div>
                    {user.followed ? <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={async () => {
                                dispatch(setToggleIsFollowingProgress(user.id, true))
                                await unfollow(user.id)
                                await refetch()
                                dispatch(setToggleIsFollowingProgress(user.id, false))
                            }}
                            className={'followed'}
                        >Unfollow</button>

                        : <button
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={async () => {
                                dispatch(setToggleIsFollowingProgress(user.id, true))
                                await follow(user.id)
                                await refetch()
                                dispatch(setToggleIsFollowingProgress(user.id, false))
                            }}
                        >Follow</button>}
                </div>
            </div>
        })}
    </div>
}

export default compose(withAuthNavigate, memo)(Users)
