const images = (state, action) => {
    switch(action.type){
        case 'add':
            return {
                urls: action.urls,
                name: action.name
            }
        default:
            return state;
    }
}
const img = (state=[], action) => {
    switch(action.type){
        case 'add':
            return[
                ...state,
                images(undefined, action)
            ]
        default:
            return state;
    }
}
export default img;