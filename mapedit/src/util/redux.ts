export const composeReducer = (...reducers) => (state, action) =>
    reducers.reduceRight((state, reducer) => reducer(state, action), state)
