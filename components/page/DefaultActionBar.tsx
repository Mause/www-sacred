'use client';

broken words

import styles from '@components/page/DefaultActionBar.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import { toggleDebugGrid } from '@components/DebugGrid';
import { useHotkeys } from '@modules/hotkeys';

import ActionBar from '@components/ActionBar';
import ButtonGroup from '@components/ButtonGroup';

function isElement(target: EventTarget | null): target is Element {
  return target instanceof Element;
}

function isHTMLElement(target: EventTarget | null): target is HTMLElement {
  return target instanceof HTMLElement;
}

const findFocusableParent = (element: Element | null): Element | null => {
  while (element) {
    element = element.parentElement;
    if (element && Utilities.isFocusableElement(element)) {
      return element;
    }
  }
  return null;
};

const findNextFocusableSibling = (element: Element, direction: 'next' | 'previous'): HTMLElement | null => {
  let sibling = direction === 'next' ? element.nextElementSibling : element.previousElementSibling;

  while (sibling) {
    if (Utilities.isFocusableElement(sibling)) {
      return sibling as HTMLElement;
    }

    const focusableDescendant = Utilities.findFocusableDescendant(sibling, null, direction);
    if (focusableDescendant) {
      return focusableDescendant;
    }

    sibling = direction === 'next' ? sibling.nextElementSibling : sibling.previousElementSibling;
  }

  return null;
};

const findNextFocusableAncestor = (element: Element, direction: 'next' | 'previous'): HTMLElement | null => {
  let ancestor = element.parentElement;

  while (ancestor) {
    const nextFocusable = findNextFocusableSibling(ancestor, direction);
    if (nextFocusable) {
      return nextFocusable;
    }
    ancestor = ancestor.parentElement;
  }

  return null;
};

const useGlobalNavigationHotkeys = () => {
  const onHandleSubmit = (event: KeyboardEvent) => {
    const target = event.target;
    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();
      (target as HTMLElement).click();
    }
  };

  const onHandleNextFocus = (event: KeyboardEvent) => {
    const target = event.target;

    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();

      const nextFocusable = Utilities.findNextFocusable(target as Element, 'next');
      if (nextFocusable) {
        nextFocusable.focus();
      }
    }
  };

  const onHandlePreviousFocus = (event: KeyboardEvent) => {
    const target = event.target;

    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();

      const previousFocusable = Utilities.findNextFocusable(target as Element, 'previous');
      if (previousFocusable) {
        previousFocusable.focus();
      }
    }
  };

  useHotkeys('ArrowDown', onHandleNextFocus);
  useHotkeys('ArrowUp', onHandlePreviousFocus);
  useHotkeys('ArrowRight', onHandleNextFocus);
  useHotkeys('ArrowLeft', onHandlePreviousFocus);
  useHotkeys('Enter', onHandleSubmit);
  useHotkeys(' ', onHandleSubmit);
};

interface DefaultActionBarProps {
  items?: {
    hotkey: string;
    onClick: () => void;
    body: React.ReactNode;
    items?: any;
  }[];
}

const FONTS = [
  ['Chicago FLF Proportional [MIT]', 'font-use-chicago-mono'],
  ['Commit Mono V143 [OFL]', 'font-use-commit-mono'],
  ['CodeNewRoman Mono 2.0 [OFL]', 'font-use-code-new-roman-mono'],
  ['Departure Mono [MIT]', 'font-use-departure-mono'],
  ['Fira Code [OFL]', 'font-use-fira-code'],
  ['Fragment Mono [OFL]', 'font-use-fragment-mono'],
  ['GlassTTY: TrueType VT220 [NO LICENSE]', 'font-use-glasstty-vt220'],
  ['Geist Mono [OFL] [DEFAULT]', ''],
  ['Intel One Mono 1.4.0 [OFL]', 'font-use-intel-one-mono'],
  ['Iosevka Term [OFL]', 'font-use-iosevka-term'],
  ['JetBrains Mono [OFL]', 'font-use-jet-brains-mono'],
  ['Julia Mono 0.061 [OFL]', 'font-use-julia-mono'],
  ['Kommuna Mono™ Trial [type.tmpstate.net]', 'font-use-kommuna-mono'],
  ['Monaspace Argon Variable [OFL]', 'font-use-monaspace-argon-mono'],
  ['Monaspace Krypton Variable [OFL]', 'font-use-monaspace-krypton-mono'],
  ['Monaspace Neon Variable [OFL]', 'font-use-monaspace-neon-mono'],
  ['Monaspace Radon Variable [OFL]', 'font-use-monaspace-radon-mono'],
  ['Monaspace Xenon Variable [OFL]', 'font-use-monaspace-xenon-mono'],
  ['M1 Plus Mono [OFL]', 'font-use-m1-plus-mono'],
  ['Panama Mono™ Trial [type.tmpstate.net]', 'font-use-panama-mono'],
  ['Web437 DOS/V re. ANK16 [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web437-dos-v-ank16'],
  ['Web437 DOS/V re. ANK19 [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web437-dos-v-ank19'],
  ['Web437 DOS/V re. ANK24 [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web437-dos-v-ank24'],
  ['Web437 DOS/V re. ANK30 [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web437-dos-v-ank30'],
  ['Web437 Nix8810 M16 [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web437-nix8810-m16'],
  ['Web437 Pheonix EGA 8X8 2Y [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web437-pheonix-ega-8x8-2y'],
  ['Web437 Sanyo MB C775 2Y [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web437-sanyo-mb-c775-2y'],
  ['WebPlus AST PremiumExec [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-webplus-ast-premiumexec'],
  ['WebPlus IBM BIOS [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web-plus-ibm-bios'],
  ['WebPlus IBM VGA 8X16 [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-web-plus-ibm-vga-8x16'],
  ['WebPlus ToshibaTxL1-8x16 [int10h.org] [VileR] [CC BY-SA 4.0]', 'font-use-toshiba-tx-l1-8x16'],
  ['SFMono Square [FOSS]', 'font-use-sfmono-square'],
  ['Server Mono [OFL]', 'font-use-server-mono'],
  ['TX-02 Berkeley Mono™ Trial [usgraphics.com]', 'font-use-berkeley-mono'],
  ['Ubuntu Sans Mono 1.006 [UBL]', 'font-use-ubuntu-mono'],
];

const MODES = [
  ['None', ''],
  ['Blue', 'tint-blue'],
  ['Green', 'tint-green'],
  ['Orange', 'tint-orange'],
  ['Purple', 'tint-purple'],
  ['Red', 'tint-red'],
  ['Yellow', 'tint-yellow'],
  ['Pink', 'tint-pink'],
];

const DefaultActionBar: React.FC<DefaultActionBarProps> = ({ items = [] }) => {
  const [isGrid, setGrid] = React.useState(false);
  const [font, setFont] = React.useState('');
  const [appearanceMode, setAppearanceMode] = React.useState('');
  const [theme, setTheme] = React.useState('');
  useHotkeys('ctrl+g', () => toggleDebugGrid());

  useGlobalNavigationHotkeys();

  React.useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      if (e.matches) {
        setTheme('theme-dark');
      } else {
        setTheme('');
      }
    };

    applyTheme(prefersDark);

    prefersDark.addEventListener('change', applyTheme);

    return () => {
      prefersDark.removeEventListener('change', applyTheme);
    };
  }, []);

  React.useEffect(() => {
    Utilities.onHandleFontChange(font);
  }, [font]);
  React.useEffect(() => {
    Utilities.onHandleAppearanceModeChange(appearanceMode);
  }, [appearanceMode]);
  React.useEffect(() => {
    Utilities.onHandleAppearanceChange(theme);
  }, [theme]);

  return (
    <div className={styles.root}>
      <ActionBar
        items={[
          {
            hotkey: '⌃+O',
            body: 'Fonts',
            openHotkey: 'ctrl+o',
            items: FONTS.map(([name, code]) => ({
              icon: '⊹',
              children: name,
              selected: font === code,
              onClick: () => setFont(code),
            })),
          },
          {
            hotkey: '⌃+A',
            body: 'Appearance',
            openHotkey: 'ctrl+a',
            items: [
              {
                icon: '⊹',
                children: 'Light',
                selected: theme === '',
                onClick: () => setTheme(''),
              },
              {
                icon: '⊹',
                children: 'Dark',
                selected: theme === 'theme-dark',
                onClick: () => setTheme('theme-dark'),
              },
            ],
          },
          {
            hotkey: '⌃+T',
            body: 'Mode',
            openHotkey: 'ctrl+t',
            items: MODES.map(([name, mode]) => ({
              icon: '⊹',
              children: name,
              selected: appearanceMode === mode,
              onClick: () => setAppearanceMode(mode),
            })),
          },
          {
            hotkey: '⌃+G',
            onClick: () => {
              toggleDebugGrid();
            },
            body: 'Grid',
            selected: false,
          },
          ...items,
        ]}
      />
    </div>
  );
};

export default DefaultActionBar;
