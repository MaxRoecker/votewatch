import type { Bill } from '../data';
import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { BillCard } from './bill-card';

describe('BillCard tests', () => {
  it('should properly render the component.', async () => {
    const bill: Bill = {
      id: '0001',
      sponsorId: '0001',
      title: 'The Unknown Act.',
    };

    render(<BillCard bill={bill} />);

    const title =
      await screen.findByTestId<HTMLHeadingElement>('bill-card-title');

    expect(title).toBeInstanceOf(HTMLHeadingElement);
    expect(title.textContent).toBe(bill.title);
  });
});
