import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';

export const SiteHeader = styled(RowFlexContainer)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(
    calc(100% - ${({ theme }) => theme.spacing(30)}),
    ${({ theme }) => theme.spacing(320)}
  );
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing(9.5)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: calc(100% - ${({ theme }) => theme.spacing(8)});
    padding-top: ${({ theme }) => theme.spacing(5)};
  }
`;

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2.5)};
  width: max-content;
  color: inherit;
  font-family: ${({ theme }) => theme.typography.displayFontFamily};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`;

export const BrandLogo = styled.img`
  display: block;
  width: ${({ theme }) => theme.spacing(12)};
  height: ${({ theme }) => theme.spacing(10)};
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: ${({ theme }) => theme.spacing(9)};
    height: ${({ theme }) => theme.spacing(8)};
  }
`;

export const BrandName = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  span {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    font-size: 0.625rem;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }
`;

export const Navigation = styled(RowFlexContainer)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
  font-family: ${({ theme }) => theme.typography.displayFontFamily};
  font-size: 1rem;
  font-weight: 300;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    gap: ${({ theme }) => theme.spacing(3)};
  }
`;

export const NavigationItem = styled(Link)<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  color: inherit;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.82)};

  svg {
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
    flex-shrink: 0;
    stroke-width: 1.6;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: ${({ theme }) => theme.spacing(-1.75)};
    left: 0;
    height: ${({ theme }) => theme.spacing(0.25)};
    background: currentColor;
    opacity: ${({ $active }) => ($active ? 0.75 : 0)};
  }
`;

export const NavigationLabel = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    display: none;
  }
`;

export const MobileActions = styled(RowFlexContainer)`
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const MenuButton = styled.button`
  display: grid;
  width: ${({ theme }) => theme.spacing(11)};
  height: ${({ theme }) => theme.spacing(11)};
  padding: 0;
  place-items: center;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;

  svg {
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};
    stroke-width: 1.6;
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.spacing(0.25)} solid currentColor;
    outline-offset: ${({ theme }) => theme.spacing(0.75)};
  }
`;

export const DrawerNavigation = styled.nav`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  padding: ${({ theme }) => theme.spacing(6, 4, 6)};
`;

export const DrawerBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(0, 0, 4)};
  padding: ${({ theme }) => theme.spacing(0, 2, 4)};
  border-bottom: ${({ theme }) => theme.spacing(0.25)} solid var(--border);
`;

export const DrawerBrandLogo = styled.img`
  display: block;
  width: ${({ theme }) => theme.spacing(9)};
  height: ${({ theme }) => theme.spacing(8)};
  object-fit: contain;
`;

export const DrawerBrandName = styled.span`
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
  font-family: ${({ theme }) => theme.typography.displayFontFamily};
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1.15;
  text-transform: uppercase;

  span {
    font-size: 0.625rem;
    line-height: 1;
  }
`;

export const DrawerNavigationItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  min-height: ${({ theme }) => theme.spacing(12)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(0, 4)};
  border-left: ${({ theme }) => theme.spacing(0.5)} solid
    ${({ $active }) => ($active ? 'var(--accent)' : 'transparent')};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active }) =>
    $active
      ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
      : 'transparent'};
  color: inherit;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? 500 : 300)};

  svg {
    width: ${({ theme }) => theme.spacing(5)};
    height: ${({ theme }) => theme.spacing(5)};
    color: var(--accent);
    stroke-width: 1.6;
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.spacing(0.5)} solid var(--accent);
    outline-offset: ${({ theme }) => theme.spacing(0.5)};
  }

  &:hover {
    background: color-mix(in srgb, var(--accent) 8%, transparent);
  }
`;

export const ModeButton = styled.button`
  display: grid;
  width: ${({ theme }) => theme.spacing(9.5)};
  height: ${({ theme }) => theme.spacing(9.5)};
  padding: 0;
  place-items: center;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;

  svg {
    width: ${({ theme }) => theme.spacing(5.75)};
    height: ${({ theme }) => theme.spacing(5.75)};
    fill: currentColor;
    stroke-width: 1.5;
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.spacing(0.25)} solid currentColor;
    outline-offset: ${({ theme }) => theme.spacing(0.75)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}px) {
    width: ${({ theme }) => theme.spacing(11)};
    height: ${({ theme }) => theme.spacing(11)};
  }
`;
