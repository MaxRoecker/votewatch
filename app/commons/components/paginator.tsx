import type { ReactNode } from 'react';
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

type PaginatorProps = {
  page: number;
  onChange: (page: number) => void;
  disabled?: boolean;
};

export function Paginator(props: PaginatorProps): ReactNode {
  const { page, onChange, disabled = false } = props;

  const isFirst = page === 1;

  const handlePreviousClick = () => {
    onChange(Math.max(page - 1, 0));
  };

  const handleNextClick = () => {
    onChange(page + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={isFirst}
            onClick={handlePreviousClick}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationButton isActive>{page}</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled={disabled} onClick={handleNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
