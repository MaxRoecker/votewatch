import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, json, redirect, useLoaderData } from '@remix-run/react';
import { BillCard } from '~/bills/components/bill-card';
import { findBillsByIds, findBillsBySponsorIds } from '~/bills/data';
import { useOutletContext } from '~/commons/utils/context';
import { getIntl } from '~/commons/utils/intl';
import { findLegislatorsByIds } from '~/legislators/data';
import { VoteResultCard } from '~/votes/components/vote-result-card';
import { findVoteByIds, findVoteResultsByLegislatorIds } from '~/votes/data';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { legislatorId } = params;
  if (legislatorId == null) return redirect('/legislators');

  const [legislator] = await findLegislatorsByIds([legislatorId]);

  if (legislator == null) throw new Response('Not Found', { status: 404 });

  const sponsored = await findBillsBySponsorIds([legislatorId]);

  const voteResults = await findVoteResultsByLegislatorIds([legislatorId]);

  const voteIds = new Set(voteResults.map((v) => v.voteId));
  const votes = await findVoteByIds(voteIds);

  const billsIds = new Set(votes.map((v) => v.billId));
  const bills = await findBillsByIds(billsIds);

  return json({ legislator, sponsored, voteResults, votes, bills });
};

export type Loader = typeof loader;

export default function Legislator() {
  const data = useLoaderData<Loader>();
  const { legislator, sponsored, voteResults, votes, bills } = data;
  const { locale } = useOutletContext();

  const intl = getIntl(locale);

  return (
    <div className="flex flex-col gap-6 md:gap-6">
      <nav>
        <ul className="flex flex-row items-center gap-1">
          <li className="shrink-0 text-border">»</li>
          <li className="shrink-0 truncate text-sm text-muted-foreground underline">
            <Link to="/legislators">
              {intl.formatMessage({ id: 'Legislators' })}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <section className="flex flex-col gap-4 md:gap-6">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            {legislator.displayName}
            <br />
            <small className="text-muted-foreground">
              ({legislator.party} - {legislator.state} - {legislator.district})
            </small>
          </h2>
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {intl.formatMessage({ id: 'Sponsor' })}
          </h3>
          <div className="flex flex-col gap-4 md:gap-6" role="list">
            {sponsored.map((bill) => {
              return (
                <Link key={bill.id} to={`/bills/${bill.id}`} role="listitem">
                  <BillCard role="listitem" bill={bill} />
                </Link>
              );
            })}
            {sponsored.length > 0 ? null : (
              <p className="text-center text-sm text-muted-foreground">
                {intl.formatMessage({ id: 'sponsoredList.empty' })}
              </p>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4 md:gap-6">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {intl.formatMessage({ id: 'Votes' })}
          </h3>
          <div className="flex flex-col gap-4 md:gap-6" role="list">
            {voteResults.map((voteResult) => {
              const vote = votes.find((v) => v.id === voteResult.voteId);
              const bill = bills.find((b) => b.id === vote?.billId);
              return vote == null || bill == null ? null : (
                <Link
                  key={voteResult.id}
                  to={`/bills/${bill.id}`}
                  role="listitem"
                >
                  <VoteResultCard
                    role="listitem"
                    voteResult={voteResult}
                    bill={bill}
                    vote={vote}
                  />
                </Link>
              );
            })}
            {voteResults.length > 0 ? null : (
              <p className="text-center text-sm text-muted-foreground">
                {intl.formatMessage({ id: 'voteList.empty' })}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
