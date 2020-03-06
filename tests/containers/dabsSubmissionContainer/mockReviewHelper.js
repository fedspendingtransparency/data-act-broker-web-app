import { submissionMetadata } from './mockData';

export const fetchSubmissionMetadata = jest.fn(() => Promise.resolve(submissionMetadata));
