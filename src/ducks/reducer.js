const initialState = {
    username: '',
}

const GET_USER_INFO = "GET_USER_INFO"

export const getUserInfo = (username) => {
    return {
        type: GET_USER_INFO,
        payload: username
    }
}

function reducer(state = initialState, action){
    // console.log('REDUCER HIT: Action ->', action)
    switch(action.type){
        case GET_USER_INFO:
        return {
            ...state,
            username: action.payload
        }
        default: {
            // console.log('hitting default')
            return state
        }
    }
}

export default reducer