import { BackgroundProps, Button, Text, ThemingProps } from "@chakra-ui/react";
import { FC } from "react";
import { useDebounce } from "../../hooks/use-debounce";

interface BaseButtonProps {
  label: string;
  background?: BackgroundProps["background"];
  variant?: ThemingProps["variant"];
  textColor?: string;
  onClick?: () => void;
}

const BaseButton: FC<BaseButtonProps> = ({
  label,
  background = "#2352c8",
  variant = "solid",
  textColor = "#fafafb",
  onClick,
}) => {
  const handleClick = (): void => {
    onClick != null && useDebounce(onClick);
  };
  return (
    <Button
      size="md"
      width="100px"
      variant={variant}
      background={background}
      onClick={handleClick}
    >
      <Text textColor={textColor}>{label}</Text>
    </Button>
  );
};

export { BaseButton };
