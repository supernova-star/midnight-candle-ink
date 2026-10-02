import React from 'react';

import { Button } from '@/components/uiComponents/button/Button';
import { Dropdown } from '@/components/uiComponents/dropdown/Dropdown';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';

const ANY_COUNTRY_VALUE = '__anywhere__';

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
  countries: string[];
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export const VisitorFilters: React.FC<VisitorFiltersProps> = ({
  options,
  selectedFilter,
  onChange,
  countries,
  selectedCountry,
  onCountryChange,
}) => (
  <div role="group" aria-label="Filter visitors">
    <RowFlexContainer
      alignItems="center"
      justifyContent="between"
      gap={[1]}
      sx={{
        flexWrap: 'wrap',
      }}
    >
      <RowFlexContainer
        alignItems="center"
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

      <Dropdown
        ariaLabel="Filter visitors by country"
        options={[
          { label: 'All Countries', value: ANY_COUNTRY_VALUE },
          ...countries.map((country) => ({ label: country, value: country })),
        ]}
        value={selectedCountry || ANY_COUNTRY_VALUE}
        onChange={(value) =>
          onCountryChange(value === ANY_COUNTRY_VALUE ? '' : value)
        }
        size="small"
        width={240}
        textOptions={{ textColor: 'var(--admin-text-primary)' }}
        borderRadius={[2]}
        colors={{
          surface: 'var(--admin-surface)',
          text: 'var(--admin-text-primary)',
          border: 'var(--admin-border)',
          accent: 'var(--admin-accent)',
          disabledText: 'var(--admin-text-muted)',
          hover: 'var(--admin-surface-hover)',
          selected: 'var(--admin-table-header)',
        }}
      />
    </RowFlexContainer>
  </div>
);
