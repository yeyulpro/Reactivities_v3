import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
  } from "@mui/material";


import { useController, type UseControllerProps } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  items: { text: string; value: string }[];
  label: string;
} & UseControllerProps<T> &   Partial<SelectProps>;;

export default function SelectInput<T extends FieldValues>({items,
  label,
  control,
  name,
  }: Props<T>) {
  const { field, fieldState } = useController({  name, control });
  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={field.value || ""}
        inputRef={field.ref}
        label={label}
        onChange={field.onChange}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
