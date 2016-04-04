export const setStatus = (state) => ({
    type: 'SET_STATUS',
    name: state.name,
    file: state.file,
    state: state.state
})