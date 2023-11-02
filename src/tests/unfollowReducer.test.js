import usersSlice, {setCurrentPage} from '../redux/usersSlice'

it('followTest', () => {
    let newState = usersSlice({
            usersData: [],
            pageSize: 100,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [],
        }, setCurrentPage(2))

    expect(newState.currentPage).toBe(2)
})