
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const prepareSettings = (settings) => {
    const errors = settings.errors.map(({ significance, description, ...keepAttrs }) => keepAttrs);
    const warnings = settings.warnings.map(({ significance, description, ...keepAttrs }) => keepAttrs);
    return { errors, warnings };
};
