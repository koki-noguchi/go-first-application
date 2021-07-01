import React, { ReactNode, memo, VFC } from "react";
import { Button } from 'semantic-ui-react';

type Props = {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
}

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = false, onClick } = props;

  return (
    <Button color='green' disabled={disabled} onClick={onClick}>
      { children }
    </Button>
  )
})
