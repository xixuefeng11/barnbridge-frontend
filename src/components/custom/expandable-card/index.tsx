import React from 'react';
import * as Antd from 'antd';
import { CardProps as AntdCardProps } from 'antd/lib/card';
import cx from 'classnames';

import s from './styles.module.scss';

export type ExpandableCardProps = AntdCardProps & {
  footer?: React.ReactNode;
};

const ExpandableCard: React.FunctionComponent<ExpandableCardProps> = props => {
  const { className, children, footer, ...cardProps } = props;

  return (
    <Antd.Card className={cx(s.component, className)} {...cardProps}>
      <div className={s.content}>{children}</div>
      {footer && <div className={s.footer}>{footer}</div>}
    </Antd.Card>
  );
};
export default ExpandableCard;
