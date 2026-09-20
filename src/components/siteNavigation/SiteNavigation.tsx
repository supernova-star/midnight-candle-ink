import React, { useState } from 'react';
import {
  BookOpen,
  Home as HomeIcon,
  Info,
  Menu,
  Moon,
  Sun,
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

export const SiteNavigation: React.FC = () => {
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
              <DrawerNavigationItem
                to="/"
                $active={pathname === '/'}
                aria-current={pathname === '/' ? 'page' : undefined}
                onClick={closeMenu}
              >
                <HomeIcon aria-hidden="true" />
                Home
              </DrawerNavigationItem>
              <DrawerNavigationItem
                to="/stories"
                $active={pathname.startsWith('/stories')}
                aria-current={
                  pathname.startsWith('/stories') ? 'page' : undefined
                }
                onClick={closeMenu}
              >
                <BookOpen aria-hidden="true" />
                Stories
              </DrawerNavigationItem>
              <DrawerNavigationItem
                to="/about"
                $active={pathname === '/about'}
                aria-current={pathname === '/about' ? 'page' : undefined}
                onClick={closeMenu}
              >
                <Info aria-hidden="true" />
                About
              </DrawerNavigationItem>
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
          <NavigationItem
            to="/"
            $active={pathname === '/'}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            <HomeIcon aria-hidden="true" />
            <NavigationLabel>Home</NavigationLabel>
          </NavigationItem>
          <NavigationItem
            to="/stories"
            $active={pathname.startsWith('/stories')}
            aria-current={pathname.startsWith('/stories') ? 'page' : undefined}
          >
            <BookOpen aria-hidden="true" />
            <NavigationLabel>Stories</NavigationLabel>
          </NavigationItem>
          <NavigationItem
            to="/about"
            $active={pathname === '/about'}
            aria-current={pathname === '/about' ? 'page' : undefined}
          >
            <Info aria-hidden="true" />
            <NavigationLabel>About</NavigationLabel>
          </NavigationItem>
          {themeButton}
        </Navigation>
      )}
    </SiteHeader>
  );
};
