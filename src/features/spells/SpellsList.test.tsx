import { screen, waitFor } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import SpellsList from './SpellsList';

describe('test', () => {
    beforeEach(() => {
        render(<SpellsList />);
    });
    it('render loading state', () => {
        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('wait for loading state disappear', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Loading')).toBe(null);
        });
    });

    it('wait for data', async () => {
        await waitFor(() => {
            expect(screen.queryByText('Loading')).toBe(null);
            expect(screen.queryByTestId('data-ss')).toBeInTheDocument();
            expect(screen.queryByTestId('data-err')).toBe(null);
        });
    });
});
