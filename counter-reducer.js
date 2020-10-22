const initState = {
    value: 0,
    loading: false,
}

function counterReducer(state = initState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                value: state.value + 1,
            }

        case 'DECREMENT':
            return {
                ...state,
                value: state.value - 1,
            }

        default:
            return state
    }
}

const reducers = combineReducers({
    todo: counterReducer,
})

const store = createStore(
    reducers,
    applyMiddleware(logger, window.ReduxThunk.default)
)

const $ = document.getElementById.bind(document)
const counter = $('counter')
const inc = $('inc')
const dec = $('dec')
const incIn1 = $('incIn1')

store.subscribe((state) => {
    const { value } = state.todo
    counter.textContent = value
})

inc.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' })
})

dec.addEventListener('click', () => {
    store.dispatch({ type: 'DECREMENT' })
})

incIn1.addEventListener('click', () => {
    store.dispatch((dispatch) => {
        setTimeout(() => {
            dispatch({ type: 'INCREMENT' })
        }, 1000)
    })
})
