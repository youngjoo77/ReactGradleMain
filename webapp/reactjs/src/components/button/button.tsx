import {Button,  ButtonProps } from "@mui/material";

export const CustomBasicButton = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>
) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children}</Button>;
}