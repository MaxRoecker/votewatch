import type { Vote, VoteResult } from '../data';
import type { HTMLAttributes } from 'react';
import type { Bill } from '~/bills/data';
import { forwardRef } from 'react';
import { Avatar, AvatarFallback } from '~/commons/components/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/commons/components/card';
import { CheckCircle, XCircle } from '~/commons/components/icons';
import { cn } from '~/commons/utils/classnames';
import { useOutletContext } from '~/commons/utils/context';
import { getIntl } from '~/commons/utils/intl';

export type VoteResultProps = HTMLAttributes<HTMLDivElement> & {
  bill: Bill;
  vote: Vote;
  voteResult: VoteResult;
};

export const VoteResultCard = forwardRef<HTMLDivElement, VoteResultProps>(
  (props, ref) => {
    const { className, bill, vote, voteResult, ...rest } = props;
    const { locale } = useOutletContext();
    const intl = getIntl(locale);

    return (
      <Card
        ref={ref}
        className={cn(className)}
        data-testid="vote-result-card"
        {...rest}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="shrink-0">
            <AvatarFallback
              className={cn({
                ['text-lime-700']: voteResult.voteType === 1,
                ['text-red-700']: voteResult.voteType !== 1,
              })}
            >
              {voteResult.voteType === 1 ? (
                <CheckCircle data-testid="vote-result-card-approved" />
              ) : (
                <XCircle data-testid="vote-result-card-opposed" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="grow">
            <CardTitle
              className="line-clamp-2"
              data-testid="vote-result-card-title"
            >
              {bill.title}
            </CardTitle>
            <CardDescription
              className="truncate"
              data-testid="vote-result-card-description"
            >
              {intl.formatMessage({ id: 'On Vote' })} #{vote.id}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    );
  },
);
VoteResultCard.displayName = 'VoteResult';
