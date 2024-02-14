import type { Vote, VoteResult } from '../data';
import type { Bill } from '~/bills/data';
import { describe, expect, it } from 'vitest';
import { render, screen } from '~/commons/utils/test-utils';
import { VoteResultCard } from './vote-result-card';

describe('VoteResultCard tests', () => {
  const bill: Bill = {
    id: '0001',
    sponsorId: '0001',
    title: 'The Unknown Act.',
  };
  const vote: Vote = {
    billId: bill.id,
    id: '001',
  };
  const voteResult1: VoteResult = {
    id: '001',
    legislatorId: '0001',
    voteId: vote.id,
    voteType: 1,
  };
  const voteResult2: VoteResult = {
    id: '001',
    legislatorId: '0001',
    voteId: vote.id,
    voteType: 2,
  };

  it('should properly render the component for approved.', async () => {
    render(<VoteResultCard bill={bill} vote={vote} voteResult={voteResult1} />);
    const title = await screen.findByTestId<HTMLHeadingElement>(
      'vote-result-card-title',
    );

    expect(title).toBeInstanceOf(HTMLHeadingElement);
    expect(title.textContent).toBe(bill.title);

    const approved = await screen.findByTestId('vote-result-card-approved');
    expect(approved).toBeInstanceOf(SVGSVGElement);

    const opposed = screen.queryByTestId('vote-result-card-opposed');
    expect(opposed).toBeNull();

    const description = await screen.findByTestId(
      'vote-result-card-description',
    );
    expect(description.textContent).toBe(`On Vote #${vote.id}`);
  });

  it('should properly render the component for opposed.', async () => {
    render(<VoteResultCard bill={bill} vote={vote} voteResult={voteResult2} />);
    const title = await screen.findByTestId<HTMLHeadingElement>(
      'vote-result-card-title',
    );

    expect(title).toBeInstanceOf(HTMLHeadingElement);
    expect(title.textContent).toBe(bill.title);

    const approved = screen.queryByTestId('vote-result-card-approved');
    expect(approved).toBeNull();

    const opposed = await screen.findByTestId('vote-result-card-opposed');
    expect(opposed).toBeInstanceOf(SVGSVGElement);

    const description = await screen.findByTestId(
      'vote-result-card-description',
    );
    expect(description.textContent).toBe(`On Vote #${vote.id}`);
  });
});
