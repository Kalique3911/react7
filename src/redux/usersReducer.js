const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = "SET-USERS"

let initialState = {
    usersData: [{
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
        followed: false,
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
    },],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    } else {return state}
                })
            }
        case UNFOLLOW:
            return {
                ...state, usersData: state.usersData.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    } else {return state}
                })
            }
        case SET_USERS:
            return {
                ...state, usersData: [...state.usersData, ...action.usersData]
            }
        default:
            return state
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUsersAC = (usersData) => ({type:SET_USERS, usersData})

export default usersReducer