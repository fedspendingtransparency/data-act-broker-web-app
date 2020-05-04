import { reorder } from 'helpers/dndHelper';

describe('reorder', () => {
    it('should return the list in a new order', () => {
        const list = ['A', 'B', 'C', 'D'];
        const newList = reorder(list, 0, 2);
        expect(newList).toEqual(['B', 'C', 'A', 'D']);
    });
});
