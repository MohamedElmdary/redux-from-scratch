class Store {
    constructor(reducer, middleware) {
        this._reducer = reducer
        this._state = undefined
        this._callbacks = []

        this._next = this._next.bind(this)
        this.getState = this.getState.bind(this)
        this.dispatch = this.dispatch.bind(this)

        this._middleware = middleware ? middleware(this)(this._next) : undefined

        this._init()
    }

    getState() {
        return this._state
    }

    dispatch(action) {
        if (this._middleware) {
            return this._middleware(action)
        }
        this._next(action)
    }

    subscribe(callback) {
        if (!this._callbacks.some((cb) => cb === callback)) {
            this._callbacks.push(callback)
            callback(this._state)
        }

        return () => {
            const index = this._callbacks.findIndex((cb) => cb === callback)
            if (index > -1) {
                this._callbacks.splice(index, 1)
            }
        }
    }

    _init() {
        this.dispatch({ type: '@@INIT' })
    }

    _next(action) {
        this._state = this._reducer(this._state, action)
        this._callbacks.forEach((cb) => {
            cb(this._state)
        })
    }
}

