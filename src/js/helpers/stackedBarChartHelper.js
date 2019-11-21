import { chartColors } from 'dataMapping/dashboard/fileLabels';

export const buildLegend = (rules = [], spacing = 30) =>
    (rules.map((label, index) => (
        {
            color: chartColors[index],
            label,
            offset: index * spacing
        }
    )));

export const calculateLegendOffset = (spacing, length, graphHeight) => {
    const legendHeight = spacing * length;
    const offset = (graphHeight - legendHeight) / 2;
    if (offset < 0) {
        return 0;
    }
    return offset;
};
