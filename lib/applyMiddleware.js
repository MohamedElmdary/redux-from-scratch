function applyMiddleware(...middlewares) {
    if (middlewares.length === 0) {
        throw new Error(
            '`applyMiddleware` function require at least one middleware'
        )
    }

    return (store) => (next) => {
        const mws = middlewares.map((mw) => {
            return mw(store)
        })
        return (action) => {
            let index = 0

            function _next() {
                if (index === middlewares.length - 1) {
                    return next(action)
                }
                index++
                _loopMiddleware()
            }

            function _loopMiddleware() {
                mws[index](_next)(action)
            }

            _loopMiddleware()
        }
    }
}
