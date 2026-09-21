import React, { FC, useState } from 'react';
import {
  BookOpen,
  Home as HomeIcon,
  Info,
  Menu,
  Moon,
  Sun,
  User,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Drawer } from '@/components/uiComponents/drawer/Drawer';
import { useThemeMode } from '@/components/themeManager/ThemeManager';
import { useResponsive } from '@/hooks/useResponsive';
import logoDark from '@/components/uiComponents/iconAssets/logoDark.svg';
import logoLight from '@/components/uiComponents/iconAssets/logoLight.svg';
import darkDrawerImage from '@/components/uiComponents/iconAssets/dark_drawer_image.svg?url';
import lightDrawerImage from '@/components/uiComponents/iconAssets/light_drawer_image.svg?url';
import {
  Brand,
  BrandLogo,
  BrandName,
  DrawerBrand,
  DrawerBrandLogo,
  DrawerBrandName,
  DrawerNavigation,
  DrawerNavigationItem,
  DrawerQuote,
  MobileActions,
  MenuButton,
  ModeButton,
  Navigation,
  NavigationItem,
  NavigationLabel,
  SiteHeader,
} from './SiteNavigation.styles';

type SiteNavigationItemProps = {
  pathname: string;
  navigationItemURL: string;
  navigationItemName: string;
  icon: React.ReactNode;
  isDesktop: boolean;
  onClick?: () => void;
};

const SiteNavigationItem: FC<SiteNavigationItemProps> = ({
  pathname,
  navigationItemURL,
  navigationItemName,
  icon,
  isDesktop,
  onClick,
}) => {
  const navigateTo =
    navigationItemURL === 'home' ? '/' : `/${navigationItemURL}`;

  return !isDesktop ? (
    <DrawerNavigationItem
      to={navigateTo}
      $active={pathname === navigateTo}
      aria-current={pathname === navigateTo ? 'page' : undefined}
      onClick={onClick}
    >
      {icon}
      {navigationItemName}
    </DrawerNavigationItem>
  ) : (
    <NavigationItem
      to={navigateTo}
      $active={pathname === navigateTo}
      aria-current={pathname === navigateTo ? 'page' : undefined}
    >
      {icon}
      <NavigationLabel>{navigationItemName}</NavigationLabel>
    </NavigationItem>
  );
};

export const SiteNavigation: FC = () => {
  const { pathname } = useLocation();
  const { mode, toggleMode } = useThemeMode();
  const isMobile = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modeLogo = mode === 'dark' ? logoDark : logoLight;

  const closeMenu = () => setIsMenuOpen(false);

  const themeButton = (
    <ModeButton
      type="button"
      onClick={toggleMode}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {mode === 'dark' ? (
        <Moon aria-hidden="true" />
      ) : (
        <Sun aria-hidden="true" />
      )}
    </ModeButton>
  );

  return (
    <SiteHeader element="header">
      <Brand to="/" aria-label="Midnight Candle home">
        <BrandLogo src={modeLogo} alt="" aria-hidden="true" />
        <BrandName>
          <span>Midnight</span>Candle & Ink
        </BrandName>
      </Brand>

      {isMobile ? (
        <>
          <MobileActions>
            {themeButton}
            <MenuButton
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu aria-hidden="true" />
            </MenuButton>
          </MobileActions>
          <Drawer
            open={isMenuOpen}
            onClose={closeMenu}
            width={320}
            backgroundImage={
              mode === 'dark' ? darkDrawerImage : lightDrawerImage
            }
          >
            <DrawerNavigation
              id="mobile-navigation"
              aria-label="Primary navigation"
            >
              <DrawerBrand aria-hidden="true">
                <DrawerBrandLogo src={modeLogo} alt="" />
                <DrawerBrandName>
                  <span>Midnight</span>Candle &amp; Ink
                </DrawerBrandName>
              </DrawerBrand>
              <SiteNavigationItem
                pathname={pathname}
                navigationItemName="Home"
                navigationItemURL="home"
                icon={<HomeIcon aria-hidden="true" />}
                isDesktop={false}
              />
              <SiteNavigationItem
                pathname={pathname}
                navigationItemName="Stories"
                navigationItemURL="stories"
                icon={<BookOpen aria-hidden="true" />}
                isDesktop={false}
              />
              <SiteNavigationItem
                pathname={pathname}
                navigationItemName="About"
                navigationItemURL="about"
                icon={<Info aria-hidden="true" />}
                isDesktop={false}
              />
              <SiteNavigationItem
                pathname={pathname}
                navigationItemName="Profile"
                navigationItemURL="profile"
                icon={<User aria-hidden="true" />}
                isDesktop={false}
              />
              <DrawerQuote>
                <span>Stories for</span>
                <span>quieter days.</span>
                <i aria-hidden="true" />
              </DrawerQuote>
            </DrawerNavigation>
          </Drawer>
        </>
      ) : (
        <Navigation element="nav" aria-label="Primary navigation">
          <SiteNavigationItem
            pathname={pathname}
            navigationItemName="Home"
            navigationItemURL="home"
            icon={<HomeIcon aria-hidden="true" />}
            isDesktop
          />
          <SiteNavigationItem
            pathname={pathname}
            navigationItemName="Stories"
            navigationItemURL="stories"
            icon={<BookOpen aria-hidden="true" />}
            isDesktop
          />
          <SiteNavigationItem
            pathname={pathname}
            navigationItemName="About"
            navigationItemURL="about"
            icon={<Info aria-hidden="true" />}
            isDesktop
          />
          <SiteNavigationItem
            pathname={pathname}
            navigationItemName="Profile"
            navigationItemURL="profile"
            icon={<User aria-hidden="true" />}
            isDesktop
          />
          {themeButton}
        </Navigation>
      )}
    </SiteHeader>
  );
};
