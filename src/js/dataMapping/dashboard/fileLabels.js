// Mapping from file API fields to labels
export const fileLabels = {
    A: 'File A',
    B: 'File B',
    C: 'File C',
    'cross-AB': 'Cross: A/B',
    'cross-BC': 'Cross: B/C',
    'cross-CD1': 'Cross: C/D1',
    'cross-CD2': 'Cross: C/D2',
    'A/B': 'Cross: A/B',
    'B/C': 'Cross: B/C',
    'C/D1': 'Cross: C/D1',
    'C/D2': 'Cross: C/D2'
};

// Colors for the stacked bar chart
export const chartColors = [
    '#2272CE', // blue
    '#FC7B4C', // orange
    '#008566', // kelly green
    '#AE397B', // fuchia
    '#FDB81E', // gold
    '#323A44', // dark gray
    '#E59393', // salmon
    '#923051', // cranberry
    '#00BFE7', // cerulean
    '#122E51', // navy
    '#94BFA2', // sage green
    '#7E22CE', // purple
    '#F1354C', // red
    '#22CE7E', // bright green
    '#90A4FF', // periwinkle
    '#D4E525', // chartreuse
    '#4C9EB2' // teal
];

// Significance Graph colors
export const significanceColors = {
    accuracy: '#00599C',
    completeness: '#AE397B',
    existence: '#008566'
};

export const errorLevels = ['error', 'warning'];

export const validationRules = [
    { value: 'A', label: 'File A' },
    { value: 'B', label: 'File B' },
    { value: 'C', label: 'File C' },
    { value: 'cross-AB', label: 'Cross: A/B' },
    { value: 'cross-BC', label: 'Cross: B/C' },
    { value: 'cross-CD1', label: 'Cross: C/D1' },
    { value: 'cross-CD2', label: 'Cross: C/D2' }];
