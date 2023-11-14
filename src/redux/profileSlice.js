import {createSlice} from '@reduxjs/toolkit'

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        postData: [{
            id: 1, text: 'Pillaging Balkans', likes: '15 likes '
        }, {
            id: 2, text: 'Besieging Constantinople', likes: '20 likes '
        }, {
            id: 3, text: 'Moving to Gaul', likes: '5 likes '
        },],
        profile: null,
        status: null,
        fake: 1
    },
    reducers: {
        setPost: (state, action) => {
            // provieriajem, est' li dannyje v pejload
            if (action.payload) {
                state.postData.push({id: state.postData.length + 1, text: action.payload, likes: '0 likes '})
            } else {
                return undefined
            }
        },
        fakeIncrementor: state => {
            state.fake += 1
        }
    }
})

export default profileSlice.reducer

export const {setPost, fakeIncrementor} = profileSlice.actions