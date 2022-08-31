import { Button as MButton, ButtonProps as MButtonProps } from '@mantine/core';
import { useStyles } from './styles';

type ButtonProps = MButtonProps & {
  onClick?: () => void;
};

export function Button({ children, onClick, ...props }: ButtonProps) {
  const { classes } = useStyles();
  return (
    <MButton onClick={onClick} className={classes.button} {...props}>
      {children}
    </MButton>
  );
}
