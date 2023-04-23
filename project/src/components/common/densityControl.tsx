import { FormControlLabel, Switch } from '@material-ui/core';

import { useIntl } from 'react-intl';

interface IDensityControl {
  dense: boolean;
  setDense: (dense: boolean) => void;
}

export const DensityControl = ({ dense, setDense }: IDensityControl) => {
  const intl = useIntl();

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };
  return (
    <FormControlLabel
      control={<Switch checked={dense} onChange={handleChangeDense} />}
      label={intl.formatMessage({
        id: 'DENSITY_PADDING_LABEL',
        defaultMessage: 'Dense padding',
      })}
    />
  );
};
