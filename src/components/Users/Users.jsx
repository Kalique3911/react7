import './Users.css'
import React, {memo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentPage, getFollowingInProgress, getPageSize} from '../../selectors/usersSelectors'
import {setCurrentPage, setToggleIsFollowingProgress} from '../../redux/usersSlice'
import {withAuthNavigate} from '../../common/HOCs/withAuthNavigate'
import {compose} from 'redux'
import {useFollowMutation, useGetUsersQuery, useUnfollowMutation} from '../../API/usersAPI'
import Select from 'react-select'
import User from './User'

const Users = () => {
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
    const options = [{value: 'followed', label: 'only followed'}, {
        value: 'ava',
        label: 'only with ava'
    }, {value: 'status', label: 'only with status'}]

    const onPageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber.value))
    }
    const onOptionChange = (option) => {
        setSearchOptions(option)
    }

    if (isLoading) {
        return <></>
    }

    return <div>
        <Select options={pagesOptions} onChange={onPageChange} className={'react-select-container'}
                classNamePrefix={'custom-select'} placeholder={'Select page'}/>
        <Select options={options} onChange={onOptionChange} className={'react-select-container'}
                classNamePrefix={'custom-select'} placeholder={'Select options'} isMulti={true}/>
        {usersData.items.map(user => {
            if (!user.followed && searchOptions.some(o => o.value === 'followed')) {
                return null
            }
            if (!user.photos.small && searchOptions.some(o => o.value === 'ava')) {
                return null
            }
            if (!user.status && searchOptions.some(o => o.value === 'status')) {
                return null
            }
            return <User key={user.id} user={user} followingInProgress={followingInProgress} fn={id => id === user.id}
                         unfollow={async () => {
                             dispatch(setToggleIsFollowingProgress(user.id, true))
                             await unfollow(user.id)
                             await refetch()
                             dispatch(setToggleIsFollowingProgress(user.id, false))
                         }} follow={async () => {
                dispatch(setToggleIsFollowingProgress(user.id, true))
                await follow(user.id)
                await refetch()
                dispatch(setToggleIsFollowingProgress(user.id, false))
            }}/>
        })}
    </div>
}

export default compose(withAuthNavigate, memo)(Users)
