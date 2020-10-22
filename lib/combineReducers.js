function combineReducers(reducers) {
    return (state, action) => {
        const newState = {}
        const keys = Object.keys(reducers)

        keys.forEach((key) => {
            const reducer = reducers[key]
            newState[key] = reducer(state ? state[key] : undefined, action)
        })

        return newState
    }
}
