import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Paragraph } from 'components/custom/typography';

import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

export type ActivationThresholdProps = {
  className?: string;
};

const ActivationThreshold: React.FunctionComponent<ActivationThresholdProps> = props => {
  const { className } = props;
  const web3c = useWeb3Contracts();

  /// move to own PROVIDER
  const activationRate = React.useMemo<number>(() => {
    const { bondStaked, activationThreshold } = web3c.daoBarn;

    if (!bondStaked || !activationThreshold) {
      return 0;
    }

    return Math.min(bondStaked.multipliedBy(100).div(activationThreshold).toNumber(), 100);
  }, [web3c.daoBarn.bondStaked, web3c.daoBarn.activationThreshold]);

  const [activating, setActivating] = React.useState<boolean>(false);

  function handleActivate() {
    setActivating(true);
    web3c.daoGovernance.actions.activate()
      .then(() => {
        setActivating(false);
        /// hide activation threshold panel
      })
      .catch(() => {
        setActivating(false);
      });
  }

  return (
    <Card className={className}>
      <Grid flow="row" gap={24}>
        <Paragraph type="p1" semiBold color="grey900">Activation threshold</Paragraph>
        <Grid gap={12} colsTemplate="auto 24px">
          <Antd.Progress
            percent={activationRate}
            trailColor="var(--color-border)"
            showInfo={false}
            strokeWidth={24}
            strokeColor={{
              '0%': '#4f6ae6',
              '100%': '#00D395',
            }} />
          <Icon type="ribbon" />
        </Grid>
        <Grid flow="col" gap={8}>
          <Icon type="bond-square" />
          <Paragraph type="p1" bold color="grey900">
            {formatBONDValue(web3c.daoBarn.bondStaked)}
          </Paragraph>
          <Paragraph type="p1" semiBold color="grey500">
            / {formatBONDValue(web3c.daoBarn.activationThreshold)} already staked.
          </Paragraph>
        </Grid>
        {activationRate === 100 && !web3c.daoGovernance.isActive && (
          <Button
            type="primary"
            loading={activating}
            onClick={handleActivate}>Activate</Button>
        )}
      </Grid>
    </Card>
  );
};

export default ActivationThreshold;