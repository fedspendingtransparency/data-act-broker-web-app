import { response } from './mockData';

export const getSubmissionPage = jest.fn(() => Promise.resolve(response));
