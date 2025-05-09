
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const listLabels = (results) => {
    return results.map((result) => `drag-row-${result.label}`);
};

export const prepareSettings = (settings) => {
    /* eslint-disable no-unused-vars */
    const errors = settings.errors.map(({ significance, description, ...keepAttrs }) => keepAttrs);
    const warnings = settings.warnings.map(({ significance, description, ...keepAttrs }) => keepAttrs);
    /* eslint-enable no-unused-vars */
    return { errors, warnings };
};
