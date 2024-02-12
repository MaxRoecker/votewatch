import type { Bill } from '../data';
import type { HTMLAttributes } from 'react';
import type { Legislator } from '~/legislators/data';
import { forwardRef } from 'react';
import { Avatar, AvatarFallback } from '~/commons/components/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/commons/components/card';
import { FileText } from '~/commons/components/icons';
import { cn } from '~/commons/utils/classnames';
import { useOutletContext } from '~/commons/utils/context';
import { getIntl } from '~/commons/utils/intl';

export type BillCardProps = HTMLAttributes<HTMLDivElement> & {
  bill: Bill;
  sponsor?: Legislator;
};

export const BillCard = forwardRef<HTMLDivElement, BillCardProps>(
  (props, ref) => {
    const { className, bill, sponsor, children, ...rest } = props;
    const { locale } = useOutletContext();
    const intl = getIntl(locale);

    return (
      <Card ref={ref} className={cn(className)} {...rest}>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="shrink-0">
            <AvatarFallback>
              <FileText />
            </AvatarFallback>
          </Avatar>
          <div className="grow">
            <CardTitle className="line-clamp-2">{bill.title}</CardTitle>
            {sponsor == null ? null : (
              <CardDescription className="truncate">
                {intl.formatMessage({ id: 'Sponsored by' })} {sponsor.name}
              </CardDescription>
            )}
          </div>
        </CardHeader>
        {children}
      </Card>
    );
  },
);
BillCard.displayName = 'BillCard';
