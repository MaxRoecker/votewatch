import type { LoaderFunctionArgs } from '@remix-run/node';
import { Link, json, useLoaderData, useSearchParams } from '@remix-run/react';
import { Button } from '~/commons/components/button';
import { Paginator } from '~/commons/components/paginator';
import { useOutletContext } from '~/commons/utils/context';
import { getIntl } from '~/commons/utils/intl';
import { IntSearchParamParser } from '~/commons/utils/searchParams';
import { LegislatorCard } from '~/legislators/components/legislator-card';
import { findLegislators } from '~/legislators/data';

const pageParser = new IntSearchParamParser(1);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = pageParser.fromSearchParam(url.searchParams.get('page'));
  const limit = 5;
  const offset = (page - 1) * limit;
  const legislators = await findLegislators({ offset, limit });
  return json({ page, limit, offset, legislators });
};

export type Loader = typeof loader;

export default function Legislators() {
  const { page, limit, legislators } = useLoaderData<Loader>();
  const { locale } = useOutletContext();
  const [, setSearchParams] = useSearchParams();

  const intl = getIntl(locale);

  const handlePageChange = (page: number) => {
    const pageParam = pageParser.toSearchParam(page);
    const next: Record<string, string> = {};
    if (pageParam != null) next['page'] = pageParam;
    setSearchParams(next);
  };

  return (
    <div className="grid grid-cols-1 gap-12 md:gap-6">
      <section className="flex flex-col gap-4 md:gap-6">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          {intl.formatMessage({ id: 'Legislators' })}
        </h2>
        <div className="flex flex-col gap-4 md:gap-6" role="list">
          {legislators.map((legislator) => {
            return (
              <Link key={legislator.id} to={`/legislators/${legislator.id}`}>
                <LegislatorCard role="listitem" legislator={legislator} />
              </Link>
            );
          })}
          {legislators.length > 0 ? null : (
            <div className="flex flex-col items-center gap-8 p-12">
              <p className="text-center text-sm text-muted-foreground">
                {intl.formatMessage({ id: 'legislatorsList.empty' })}
              </p>
              <Button variant="outline">
                <Link to="/legislators">
                  {intl.formatMessage({ id: 'Back to first page' })}
                </Link>
              </Button>
            </div>
          )}
        </div>
        <Paginator
          page={page}
          onChange={handlePageChange}
          disabled={legislators.length < limit}
        />
      </section>
    </div>
  );
}
