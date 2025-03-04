/**
 * @jest-environment jsdom
 *
 * settingsTableHelper-test.js
 * Created by Maxwell Kendall 06/11/19
 */

import { reorder, prepareSettings } from 'helpers/settingsTableHelper';

describe('reorder', () => {
    it('should return the list in a new order', () => {
        const list = ['A', 'B', 'C', 'D'];
        const newList = reorder(list, 0, 2);
        expect(newList).toEqual(['B', 'C', 'A', 'D']);
    });
});

describe('prepareSettings', () => {
    it('should filter out the description and significance properties', () => {
        const beforeSettings = {
            errors: [
                {
                    label: 'X1.0',
                    impact: 'low',
                    significance: 1,
                    description: 'mock description'
                },
                {
                    label: 'Y2.0',
                    impact: 'medium',
                    significance: 2,
                    description: 'mock description'
                }
            ],
            warnings: [
                {
                    label: 'Y2.0',
                    impact: 'low',
                    significance: 1,
                    description: 'mock description'
                },
                {
                    label: 'Z1.0',
                    impact: 'high',
                    significance: 2,
                    description: 'mock description'
                }
            ]
        };
        const expected = {
            errors: [
                {
                    label: 'X1.0',
                    impact: 'low'
                },
                {
                    label: 'Y2.0',
                    impact: 'medium'
                }
            ],
            warnings: [
                {
                    label: 'Y2.0',
                    impact: 'low'
                },
                {
                    label: 'Z1.0',
                    impact: 'high'
                }
            ]
        };
        const result = prepareSettings(beforeSettings);
        expect(result).toEqual(expected);
    });
});
