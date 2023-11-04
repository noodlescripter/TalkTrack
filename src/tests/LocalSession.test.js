import { render, screen } from '@testing-library/react';
import LocalSession from "../components/modules/speechModules/comps/Local/LocalSession";

test('renders learn react link', () => {
    render(<LocalSession />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
