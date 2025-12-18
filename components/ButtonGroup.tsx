'use client';

import styles from '@components/ButtonGroup.module.scss';

import * as Utilities from '@common/utilities';

import ActionButton from '@components/ActionButton';
import DropdownMenuTrigger from '@components/DropdownMenuTrigger';

export interface ButtonGroupItem {
  hotkey?: string;
  body: string; //React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  openHotkey?: string;
  items?: {
    hotkey?: string;
    body: React.ReactNode;
    selected?: boolean;
    onClick?: () => void;
  }[];
}
const ButtonGroup = (props: { items: ButtonGroupItem[]; isFull?: boolean }) => {
  if (!props.items) {
    return null;
  }

  return (
    <div className={Utilities.classNames(styles.root, props.isFull ? styles.full : null)}>
      {props.items.map((each) => {
        if (each.items) {
          return (
            <DropdownMenuTrigger key={each.body} items={each.items} hotkey={each.openHotkey}>
              <ActionButton hotkey={each.hotkey} isSelected={each.selected}>
                {each.body}
              </ActionButton>
            </DropdownMenuTrigger>
          );
        }

        return (
          <ActionButton key={each.body} onClick={each.onClick} hotkey={each.hotkey} isSelected={each.selected}>
            {each.body}
          </ActionButton>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
