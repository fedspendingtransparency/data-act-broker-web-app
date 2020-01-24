/* eslint-disable import/prefer-default-export */
export const mockProps = {
    children: () => jest.fn(() => null),
    session: {
        login: 'loggedIn',
        user: {
            affiliations: []
        }
    },
    authFn: jest.fn(),
    location: {
        key: 'ac3df4',
        pathname: '/somewhere',
        search: '?some=search-string',
        hash: '#howdy',
        state: {}
    },
    history: {
        length: 0,
        location: {
            pathname: '/somewhere',
            search: '?some=search-string'
        },
        push: jest.fn()
    }
};
/* eslint-enable import/prefer-default-export */
