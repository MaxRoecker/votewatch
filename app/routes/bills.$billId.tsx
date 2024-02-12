import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, json, redirect, useLoaderData } from '@remix-run/react';
import { Fragment } from 'react';
import { findBillsByIds } from '~/bills/data';
import { useOutletContext } from '~/commons/utils/context';
import { getIntl } from '~/commons/utils/intl';
import { LegislatorCard } from '~/legislators/components/legislator-card';
import { findLegislatorsByIds } from '~/legislators/data';
import { findVoteByBillIds, findVoteResultsByVoteIds } from '~/votes/data';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { billId } = params;
  if (billId == null) return redirect('/bills');

  const [bill] = await findBillsByIds([billId]);

  if (bill == null) throw new Response('Not Found', { status: 404 });

  const [sponsor] = await findLegislatorsByIds([bill.sponsorId]);

  const votes = await findVoteByBillIds([billId]);

  const voteIds = new Set(votes.map((v) => v.id));
  const voteResults = await findVoteResultsByVoteIds(voteIds);

  const legislatorsIds = new Set(voteResults.map((v) => v.legislatorId));
  const legislators = await findLegislatorsByIds(legislatorsIds);

  const supported = voteResults.filter((v) => v.voteType === 1);
  const opposed = voteResults.filter((v) => v.voteType !== 1);

  return json({ legislators, sponsor, votes, bill, supported, opposed });
};

export type Loader = typeof loader;

export default function Legislator() {
  const data = useLoaderData<Loader>();
  const { legislators, sponsor, supported, opposed, votes, bill } = data;
  const { locale } = useOutletContext();

  const intl = getIntl(locale);

  return (
    <div className="flex flex-col gap-6 md:gap-6">
      <nav>
        <ul className="flex flex-row items-center gap-1">
          <li className="shrink-0 text-border">»</li>
          <li className="shrink-0 truncate text-sm text-muted-foreground underline">
            <Link to="/bills">{intl.formatMessage({ id: 'Bills' })}</Link>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col justify-between gap-4 md:col-span-2 md:flex-row md:gap-24">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            {bill.title}
          </h2>
          <section className="flex flex-col gap-4 md:gap-6">
            <h3 className="scroll-m-20 text-start text-xl font-semibold tracking-tight md:text-end">
              {intl.formatMessage({ id: 'Sponsor' })}
            </h3>
            <div className="flex shrink-0 flex-col gap-4 md:gap-6" role="list">
              {sponsor == null ? (
                <p className="text-center text-sm text-muted-foreground sm:text-end">
                  {intl.formatMessage({ id: 'sponsor.empty' })}
                </p>
              ) : (
                <Link to={`/legislators/${sponsor.id}`}>
                  <LegislatorCard legislator={sponsor} />
                </Link>
              )}
            </div>
          </section>
        </div>

        <section className="flex flex-col gap-4 md:gap-6">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {intl.formatMessage({ id: 'Supported' })}
          </h3>
          <div className="flex flex-col gap-4 md:gap-6" role="list">
            {votes.map((vote) => {
              const voteSupported = supported.filter(
                (vr) => vr.voteId === vote.id,
              );
              return (
                <Fragment key={vote.id}>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
                    {intl.formatMessage({ id: 'On Vote' })} #{vote.id} (
                    {voteSupported.length})
                  </h4>
                  {voteSupported.map((voteResult) => {
                    const legislator = legislators.find(
                      (l) => l.id === voteResult.legislatorId,
                    );
                    return legislator == null ? null : (
                      <Link
                        key={voteResult.id}
                        to={`/legislators/${legislator.id}`}
                        role="listitem"
                      >
                        <LegislatorCard legislator={legislator} />
                      </Link>
                    );
                  })}
                  {voteSupported.length > 0 ? null : (
                    <p className="text-center text-sm text-muted-foreground">
                      {intl.formatMessage({ id: 'supported.empty' })}
                    </p>
                  )}
                </Fragment>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4 md:gap-6">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {intl.formatMessage({ id: 'Opposed' })}
          </h3>
          <div className="flex flex-col gap-4 md:gap-6" role="list">
            {votes.map((vote) => {
              const voteOpposed = opposed.filter((vr) => vr.voteId === vote.id);
              return (
                <Fragment key={vote.id}>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground">
                    {intl.formatMessage({ id: 'On Vote' })} #{vote.id} (
                    {voteOpposed.length})
                  </h4>
                  {voteOpposed.map((voteResult) => {
                    const legislator = legislators.find(
                      (l) => l.id === voteResult.legislatorId,
                    );
                    return legislator == null ? null : (
                      <Link
                        key={voteResult.id}
                        to={`/legislators/${legislator.id}`}
                        role="listitem"
                      >
                        <LegislatorCard legislator={legislator} />
                      </Link>
                    );
                  })}
                  {voteOpposed.length > 0 ? null : (
                    <p className="text-center text-sm text-muted-foreground">
                      {intl.formatMessage({ id: 'opposed.empty' })}
                    </p>
                  )}
                </Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
