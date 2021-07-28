import * as stackedBarHelper from 'helpers/stackedBarChartHelper';

describe('stacked bar chart helper functions', () => {
    describe('buildLegend', () => {
        it('should return an empty array when no rules are passed to the function', () => {
            const legend = stackedBarHelper.buildLegend();
            expect(legend.length).toEqual(0);
        });
        it('should build a legend the same length as the number of rules', () => {
            const mockRules = ['C12', 'C11', 'C23.2'];
            const legend = stackedBarHelper.buildLegend(mockRules);
            expect(legend.length).toEqual(3);
        });
        it('should correlate each rule with a color in the specified order', () => {
            const mockRules = ['C12', 'C11', 'C23.2'];
            const legend = stackedBarHelper.buildLegend(mockRules);
            expect(legend[1].color).toEqual('#FC7B4C');
        });
        it('should calculate the y-offset based on the index', () => {
            const mockRules = ['C12', 'C11', 'C23.2'];
            const legend = stackedBarHelper.buildLegend(mockRules);
            expect(legend[2].offset).toEqual(90);
            expect(legend[1].offset).toEqual(60);
            expect(legend[0].offset).toEqual(30);
        });
    });
    describe('calculateLegendOffset', () => {
        it('should return the offset that will center the legend along the y-axis', () => {
            const legendCount = 4;
            const height = 140;
            const mockOffset = stackedBarHelper.calculateLegendOffset(legendCount, height);
            // |    10px |
            // | -- 30px |
            // |         |
            // | -- 30px |
            // |         | 140px
            // | -- 30px |
            // |         |
            // | -- 30px |
            // |         |
            // |    10px |
            expect(mockOffset).toEqual(10);
        });
        it('should return 0 if the graph height is less than the legend height', () => {
            const spacing = 20;
            const legendCount = 4;
            const height = 60;
            const mockOffset = stackedBarHelper.calculateLegendOffset(spacing, legendCount, height);
            expect(mockOffset).toEqual(0);
        });
        it('should handle the max rules (19)', () => {
            const legendCount = 19;
            const height = 490; // graph height 540 - 50px bottom padding
            const mockOffset = stackedBarHelper.calculateLegendOffset(legendCount, height);
            expect(mockOffset).toBeGreaterThan(0);
        });
    });
});
