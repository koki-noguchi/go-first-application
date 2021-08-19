import React, { ReactNode, memo, FC } from "react";
import { Button } from 'semantic-ui-react';

type Props = {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
}
// eslint-disable-next-line react/display-name
export const PrimaryButton: FC<Props> = memo((props: Props) => {
  const { children, disabled = false, onClick } = props;

  return (
    <Button color='green' disabled={disabled} onClick={onClick}>
      { children }
    </Button>
  )
})
