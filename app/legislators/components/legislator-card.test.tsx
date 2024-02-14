import type { Legislator } from '../data';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LegislatorCard } from './legislator-card';
// import { createRemixStub } from '@remix-run/testing';

// const RemixStub = createRemixStub([
//   {
//     path: '/',
//     Component: MyComponent,
//     loader() {
//       return json({ message: 'hello' });
//     },
//   },
// ]);

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
