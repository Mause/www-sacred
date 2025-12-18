import styles from '@components/ActionBar.module.scss';

import ButtonGroup, { ButtonGroupItem } from '@components/ButtonGroup';

interface ActionBarItem {
  hotkey?: string;
  onClick?: () => void;
  openHotkey?: string;
  selected?: boolean;
  body: string; //React.ReactNode;
  items?: ButtonGroupItem[];
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
