/* eslint-disable import/prefer-default-export */
import { chartColors } from 'dataMapping/dashboard/fileLabels';

export const buildLegend = (rules = []) =>
    (rules.map((label, index) => (
        {
            color: chartColors[index],
            label
        }
    )));

/* eslint-enable import/prefer-default-export */
