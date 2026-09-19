import React, { type ReactNode } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { X } from 'lucide-react';

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  anchor?: DrawerAnchor;
  width?: string | number;
  height?: string | number;
  children: ReactNode;
}

const isVertical = (anchor: DrawerAnchor) =>
  anchor === 'top' || anchor === 'bottom';

const closeButtonStyle = (anchor: DrawerAnchor): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '4px',
    background: 'color-mix(in srgb, var(--surface) 88%, var(--background))',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    color: 'var(--text-primary)',
  };

  // Keep the close control within the drawer so it remains easy to find and tap.
  if (anchor === 'left') return { ...base, right: 16, top: 16 };
  if (anchor === 'right') return { ...base, left: 16, top: 16 };
  if (anchor === 'top') return { ...base, right: 16, bottom: 16 };
  if (anchor === 'bottom') return { ...base, right: 16, top: 16 };
  return base;
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  showCloseButton = true,
  anchor = 'left',
  width = 320,
  height = 320,
  children,
}) => {
  const vertical = isVertical(anchor);

  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor:
              'color-mix(in srgb, var(--surface) 88%, var(--background))',
            backgroundImage:
              'linear-gradient(145deg, color-mix(in srgb, var(--accent) 7%, transparent), transparent 42%), repeating-linear-gradient(0deg, transparent, transparent 39px, color-mix(in srgb, var(--border) 22%, transparent) 40px)',
            backdropFilter: 'blur(18px) saturate(0.9)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            borderRadius:
              anchor === 'left'
                ? '0 12px 12px 0'
                : anchor === 'right'
                  ? '12px 0 0 12px'
                  : anchor === 'top'
                    ? '0 0 12px 12px'
                    : '12px 12px 0 0',
            width: vertical ? '100%' : width,
            height: vertical ? height : '100%',
            overflow: 'visible',
            boxShadow: '0 18px 48px rgba(0, 0, 0, 0.28)',
          },
        },
        backdrop: {
          sx: {
            backgroundColor: 'rgba(20, 16, 14, 0.38)',
            backdropFilter: 'blur(2px)',
          },
        },
      }}
      ModalProps={{ keepMounted: false }}
    >
      {/* close button centered on the opening edge */}
      {showCloseButton && (
        <button
          onClick={onClose}
          style={closeButtonStyle(anchor)}
          aria-label="Close drawer"
        >
          <X size={16} />
        </button>
      )}

      {/* scrollable content area */}
      <div
        style={{
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>
        {children}
      </div>
    </MuiDrawer>
  );
};
