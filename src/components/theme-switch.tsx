import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useSwitch } from "@heroui/switch";
import clsx from "clsx";
import { useTheme } from "@heroui/use-theme";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export const ThemeSwitch: FC = () => {
  const { theme, setTheme } = useTheme();

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    onChange: () => setTheme(theme === "light" ? "dark" : "light"),
  });

  return (
    <Component
      title={isSelected ? "Donkere modus" : "Lichte modus"}
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx([
            "w-auto h-auto",
            "bg-transparent",
            "rounded-lg",
            "flex items-center justify-center",
            "group-data-[selected=true]:bg-transparent",
            "!text-default-500",
            "pt-px",
            "px-0",
            "mx-0",
          ]),
        })}
      >
        {isSelected ? (
          <MoonFilledIcon size={22} />
        ) : (
          <SunFilledIcon size={22} />
        )}
      </div>
    </Component>
  );
};
