import { BackgroundProps, Button, Text, ThemingProps } from "@chakra-ui/react";
import { useDebounce } from "../../hooks/use-debounce";

type BaseButtonProps = {
  label: string;
  background?: BackgroundProps["background"];
  variant?: ThemingProps["variant"];
  textColor?: string;
  onClick?: () => void;
};

const BaseButton = ({
  label,
  background = "#2352c8",
  variant = "solid",
  textColor = "#fafafb",
  onClick,
}: BaseButtonProps) => {
  const handleClick = onClick && useDebounce(onClick);
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
