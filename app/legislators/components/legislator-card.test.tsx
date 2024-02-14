import type { Legislator } from '../data';
import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { LegislatorCard } from './legislator-card';

describe('LegislatorCard tests', () => {
  it('should properly render the component.', async () => {
    const legislator: Legislator = {
      id: '0001',
      displayName: 'Rep. John Doe',
      name: 'John Doe',
      district: '1',
      party: 'R',
      state: 'OH',
    };

    render(<LegislatorCard legislator={legislator} />);

    const title = await screen.findByTestId<HTMLHeadingElement>(
      'legislator-card-title',
    );
    expect(title).toBeInstanceOf(HTMLHeadingElement);
    expect(title.textContent).toBe(legislator.displayName);
  });
});
