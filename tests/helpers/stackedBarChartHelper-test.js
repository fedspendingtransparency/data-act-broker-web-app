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
    });
});
