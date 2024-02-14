import type { Legislator } from '../data';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Avatar, AvatarFallback } from '~/commons/components/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/commons/components/card';
import { cn } from '~/commons/utils/classnames';
import { getInitials } from '../utils';

export type LegislatorCardProps = HTMLAttributes<HTMLDivElement> & {
  legislator: Legislator;
};

export const LegislatorCard = forwardRef<HTMLDivElement, LegislatorCardProps>(
  (props, ref) => {
    const { className, legislator, children, ...rest } = props;
    return (
      <Card
        ref={ref}
        className={cn(className)}
        data-testid="legislator-card"
        {...rest}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="shrink-0 grow-0">
            <AvatarFallback>{getInitials(legislator)}</AvatarFallback>
          </Avatar>
          <div className="grow">
            <CardTitle className="truncate" data-testid="legislator-card-title">
              {legislator.displayName}
            </CardTitle>
            <CardDescription
              className="truncate"
              data-testid="legislator-card-description"
            >
              {legislator.party} - {legislator.state} - {legislator.district}
            </CardDescription>
          </div>
        </CardHeader>
        {children}
      </Card>
    );
  },
);
LegislatorCard.displayName = 'LegislatorCard';
