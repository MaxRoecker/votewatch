import { Link, json, useLoaderData } from '@remix-run/react';
import { BillCard } from '~/bills/components/bill-card';
import { listBills } from '~/bills/data';
import { Button } from '~/commons/components/button';
import { useOutletContext } from '~/commons/utils/context';
import { getIntl } from '~/commons/utils/intl';
import { LegislatorCard } from '~/legislators/components/legislator-card';
import { listLegislators, retrieveLegislator } from '~/legislators/data';

export const loader = async () => {
  const [legislators, bills] = await Promise.all([
    listLegislators({ offset: 0, limit: 4 }),
    listBills({ offset: 0, limit: 4 }),
  ]);
  const sponsors = await Promise.all(
    bills.map((bill) => retrieveLegislator(bill.sponsorId)),
  );
  return json({ legislators, bills, sponsors });
};

export type Loader = typeof loader;

export default function Index() {
  const { legislators, bills, sponsors } = useLoaderData<Loader>();
  const { locale } = useOutletContext();
  const intl = getIntl(locale);
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-6">
      <section className="flex flex-col gap-4 md:gap-6">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          {intl.formatMessage({ id: 'Latest Legislators' })}
        </h2>
        <div className="flex flex-col gap-4 md:gap-6" role="list">
          {legislators.map((legislator) => {
            return (
              <Link key={legislator.id} to={`/legislators/${legislator.id}`}>
                <LegislatorCard role="listitem" legislator={legislator} />
              </Link>
            );
          })}
        </div>
        <Button asChild>
          <Link to="/legislators">
            {intl.formatMessage({ id: 'See all legislators' })}
          </Link>
        </Button>
      </section>
      <section className="flex flex-col gap-4 md:gap-6">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          {intl.formatMessage({ id: 'Latest Bills' })}
        </h2>
        <div className="flex flex-col gap-4 md:gap-6" role="list">
          {bills.map((bill, index) => {
            const sponsor = sponsors.at(index);
            return (
              <Link key={bill.id} to={`/bills/${bill.id}`}>
                <BillCard role="listitem" bill={bill} sponsor={sponsor} />
              </Link>
            );
          })}
        </div>

        <Button asChild>
          <Link to="/bills">{intl.formatMessage({ id: 'See all bills' })}</Link>
        </Button>
      </section>
    </div>
  );
}
