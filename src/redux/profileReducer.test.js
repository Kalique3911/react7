import profileReducer, {addPost} from './profileReducer'

it('kaltest', () => {
    let action = addPost('kal')
    let initialState = {
        postData: [{
            id: 1, text: 'Pillaging Balkans', likes: '15 likes '
        }, {
            id: 2, text: 'Besieging Constantinople', likes: '20 likes '
        }, {
            id: 3, text: 'Moving to Gaul', likes: '5 likes '
        },],
        newPostText: 'kal',
        profile: null,
        status: null
    }
    let newState = profileReducer(initialState, action)

    expect(newState.postData[3].text).toBe('kal')
})

