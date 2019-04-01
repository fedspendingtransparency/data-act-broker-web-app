import reducer from '../../src/js/redux/reducers/uiReducer';

describe('ui reducer', () => {
    it('has correct initial state', () => {
        expect(reducer(undefined, {})).toEqual({ loading: false });
    });
    it('handles setLoading action creator', () => {
        expect(reducer(undefined, { type: 'SET_LOADING', payload: true })).toEqual({ loading: true });
    });
});
