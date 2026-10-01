import React from 'react';

import { Button } from '@/components/uiComponents/button/Button';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';

export type VisitorFilter = 'all' | 'active' | 'returned';

export interface VisitorFilterOption {
  label: string;
  filter: VisitorFilter;
  count: number;
}

interface VisitorFiltersProps {
  options: VisitorFilterOption[];
  selectedFilter: VisitorFilter;
  onChange: (filter: VisitorFilter) => void;
}

export const VisitorFilters: React.FC<VisitorFiltersProps> = ({
  options,
  selectedFilter,
  onChange,
}) => (
  <div role="group" aria-label="Filter visitors">
    <RowFlexContainer
      gap={[1]}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      {options.map(({ label, filter, count }) => {
        const isSelected = selectedFilter === filter;

        return (
          <Button
            key={filter}
            text={`${label} (${count})`}
            size="small"
            variant={isSelected ? 'contained' : 'outlined'}
            textOptions={{
              textColor: isSelected
                ? 'var(--admin-button-primary-text)'
                : 'var(--admin-text-secondary)',
              textWeight: 'semiBold',
              textVariant: 'caption',
            }}
            buttonStyles={{
              bgColor: isSelected
                ? 'var(--admin-button-primary)'
                : 'var(--admin-surface)',
              borderRadius: [2],
            }}
            aria-pressed={isSelected}
            onClick={() => onChange(filter)}
            sx={{
              minHeight: 36,
              px: 1.5,
              borderColor: 'var(--admin-border-strong)',
              '&:hover': {
                backgroundColor: isSelected
                  ? 'var(--admin-button-primary-hover)'
                  : 'var(--admin-surface-hover)',
              },
            }}
          />
        );
      })}
    </RowFlexContainer>
  </div>
);
