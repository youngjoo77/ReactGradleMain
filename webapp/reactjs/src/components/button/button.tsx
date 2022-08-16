import { Button, ButtonProps } from "@mui/material";

/**
 * @description 버튼 컴포넌트
 * @param props 
 * @returns 버튼 컴포넌트
 */
const CustomBasicButton = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>
) => {
  const { children, ...rest } = props;
  return <Button {...rest}
  >{children}</Button>;
}

export { CustomBasicButton }