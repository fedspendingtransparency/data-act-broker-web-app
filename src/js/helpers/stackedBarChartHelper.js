import { chartColors } from 'dataMapping/dashboard/fileLabels';

// When there are more than 11 legend items, space them closer together
const getSpacing = (length) => (length > 11 ? 25 : 30);

export const buildLegend = (rules = []) => {
    const spacing = getSpacing(rules.length);
    const legendHeight = spacing * rules.length;
    // we want to make sure that they display in the order we have them, not opposite, for tabbing purposes
    // Index is 0-indexed so we want to subtract an extra 1 from the length to match up right
    return (rules.map((label, index) => (
        {
            color: chartColors[index],
            label,
            offset: legendHeight - ((rules.length - index - 1) * spacing)
        }
    )));
};

export const calculateLegendOffset = (length, graphHeight) => {
    const spacing = getSpacing(length);
    const legendHeight = spacing * length;
    const offset = (graphHeight - legendHeight) / 2;
    if (offset < 0) {
        return 0;
    }
    return offset;
};
