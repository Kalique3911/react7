import {createSlice} from '@reduxjs/toolkit'

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        postData: [{
            id: 1, text: 'It is my first post', likes: 15
        }, {
            id: 2, text: 'Hello', likes: 20
        }, {
            id: 3, text: 'Check this out', likes: 5
        },],
    },
    reducers: {
        setPost: (state, action) => {
            // provieriajem, est' li dannyje v pejload
            if (action.payload) {
                state.postData.push({id: state.postData.length + 1, text: action.payload, likes: 0})
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