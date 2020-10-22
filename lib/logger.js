function logger({ getState }) {
    return (next) => (action) => {
        console.log('will dispatch', action)

        next(action)

        console.log('state after dispatch', getState())
    }
}
