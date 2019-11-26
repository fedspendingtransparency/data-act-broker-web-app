import { chartColors } from 'dataMapping/dashboard/fileLabels';

// When there are more than 11 legend items, space them closer together
const getSpacing = (length) => (length > 11 ? 25 : 30);

export const buildLegend = (rules = []) => {
    const spacing = getSpacing(rules.length);
    const legendHeight = spacing * rules.length;
    return (rules.map((label, index) => (
        {
            color: chartColors[index],
            label,
            offset: legendHeight - (index * spacing)
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
