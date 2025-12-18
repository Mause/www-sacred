import styles from '@components/ActionBar.module.scss';

import * as Utilities from '@common/utilities';

import ButtonGroup from '@components/ButtonGroup';

interface ActionBarItem {
  hotkey?: string;
  onClick?: () => void;
  openHotkey?: string;
  selected?: boolean;
  body: React.ReactNode;
  items?: any;
}

interface ActionBarProps {
  items: ActionBarItem[];
}

const ActionBar = ({ items }: ActionBarProps) => {
  return (
    <div className={styles.root}>
      <ButtonGroup items={items} />
    </div>
  );
};

export default ActionBar;
