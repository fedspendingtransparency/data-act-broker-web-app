export const mockActions = {
    updateDashboardFilter: jest.fn(),
    toggleDashboardFilter: jest.fn(),
    resetAppliedFilters: jest.fn(),
    resetDashboardFilters: jest.fn()
};

export const mockRedux = {
    type: 'dabs',
    stagedFilters: {
        dabs: {
            active: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            },
            certified: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            }
        },
        fabs: {
            active: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            },
            published: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            }
        }
    },
    appliedFilters: {
        dabs: {
            active: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            },
            certified: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            }
        },
        fabs: {
            active: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            },
            published: {
                agencies: [],
                fileNames: [],
                submissionIds: [],
                createdBy: [],
                lastDateModified: {
                    startDate: '',
                    endDate: ''
                }
            }
        }
    }
};