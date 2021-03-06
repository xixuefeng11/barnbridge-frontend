import React from 'react';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Paragraph } from 'components/custom/typography';
import { formatBONDValue } from 'web3/utils';
import { getFormattedDuration } from 'utils';

export type WalletLockConfirmModalProps = ModalProps & {
  balance?: BigNumber;
  duration?: number;
};

const WalletLockConfirmModal: React.FunctionComponent<WalletLockConfirmModalProps> = props => {
  const { balance, duration, ...modalProps } = props;

  return (
    <Modal centered width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16}>
          <Icons
            name="warning-outlined"
            width={40}
            height={40}
            color="red500"
          />
          <Grid flow="row" gap={8}>
            <Heading type="h3" semiBold color="grey900">
              Are you sure you want to lock your balance?
            </Heading>
            <Paragraph type="p2" semiBold color="grey500">
              You are about to lock {formatBONDValue(balance)} $BOND for {getFormattedDuration(0, duration)}.
              <br /><br />
              You cannot undo this or partially lock your balance.
              <br /><br />
              Locked tokens will be unavailable for withdrawal until the lock timer ends.
              <br /><br />
              All future deposits you make will be locked for the same time.
              <br /><br />
            </Paragraph>
            <Paragraph type="p2" bold color="grey900">
              The multiplier you get for locking tokens only applies to your voting power, it does not earn more
              rewards.
            </Paragraph>
          </Grid>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button type="default" onClick={modalProps.onCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={modalProps.onOk}>
            Lock balance
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default WalletLockConfirmModal;
