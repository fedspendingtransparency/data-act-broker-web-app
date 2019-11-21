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
            const legend = stackedBarHelper.buildLegend(mockRules, 20);
            expect(legend[2].offset).toEqual(40);
        });
    });
    describe('calculateLegendOffset', () => {
        it('should return the offset that will center the legend along the y-axis', () => {
            const spacing = 20;
            const legendCount = 4;
            const graphHeight = 100;
            const mockOffset = stackedBarHelper.calculateLegendOffset(spacing, legendCount, graphHeight);
            // |    10px |
            // | -- 20px |
            // |         |
            // | -- 20px |
            // |         | 100px
            // | -- 20px |
            // |         |
            // | -- 20px |
            // |         |
            // |    10px |
            expect(mockOffset).toEqual(10);
        });
        it('should return 0 if the graph height is less than the legend height', () => {
            const spacing = 20;
            const legendCount = 4;
            const graphHeight = 60;
            const mockOffset = stackedBarHelper.calculateLegendOffset(spacing, legendCount, graphHeight);
            expect(mockOffset).toEqual(0);
        });
    });
});
