import { screen } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import DamageTable from './DamageTable';

describe('Test DamageTable components', () => {
    beforeEach(() => {
        render(<DamageTable damage={{ 0: '2d2', 1: '5d6' }} />);
    });
    it('render rows in the table', () => {
        expect(screen.getByText('2d2')).toBeInTheDocument();
        expect(screen.getByText('5d6')).toBeInTheDocument();
    });
});
