import * as reviewHelper from 'helpers/reviewHelper';

describe('reviewHelper', () => {
    describe('getFileStates', () => {
        const generateParam = (jobs = []) => ({
            jobs
        });
        const defaultResult = (name) => ({
			report: null,
			error_count: 0,
			warning_count: 0,
			error_data: [],
			warning_data: [],
			file_type: name
        });
        it('returns an empty object if file_type is falsy', () => {
            expect(reviewHelper.getFileStates(generateParam())).toEqual({});
        });
        it('returns an object keyed by file type', () => {
            expect(reviewHelper.getFileStates(generateParam([
				{ file_type: 'test', error_data: [], warning_data: [] },
				{ file_type: 'test2', error_data: [], warning_data: [] }
			]))).toEqual({
				'test': defaultResult('test'),
				'test2': defaultResult('test2')
			});
		});
    });
});
