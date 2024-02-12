import type { Bill } from '../data';
import type { HTMLAttributes } from 'react';
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

export type BillCardProps = HTMLAttributes<HTMLDivElement> & {
  bill: Bill;
};

export const BillCard = forwardRef<HTMLDivElement, BillCardProps>(
  (props, ref) => {
    const { className, bill, children, ...rest } = props;
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
            <CardDescription className="truncate">{children}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    );
  },
);
BillCard.displayName = 'BillCard';
