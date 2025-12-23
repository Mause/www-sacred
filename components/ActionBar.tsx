import styles from '@components/ActionBar.module.scss';

import * as React from 'react';
import ButtonGroup, { ButtonGroupItem } from '@components/ButtonGroup';

interface ActionBarProps {
  items: ButtonGroupItem[];
}

const ActionBar: React.FC<ActionBarProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      <ButtonGroup items={items} />
    </div>
  );
};

export default ActionBar;
