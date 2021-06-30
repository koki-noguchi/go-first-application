import React, {ReactNode, memo, VFC} from "react";
import { Button } from 'semantic-ui-react';

type Props = {
  children: ReactNode;
  disabled: boolean;
}

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = false } = props;
  return (
    <Button color='green' disabled={disabled}>
      { children }
    </Button>
  )
})
