import { TextField, type TextFieldProps } from "@mui/material";

import { useController,  type FieldValues, type UseControllerProps,} from "react-hook-form";

type Props<T extends FieldValues> = {

} & (UseControllerProps<T> &
  TextFieldProps);

export default function TextInput<T extends FieldValues>({name, control, label, }: Props<T>) {
  const { field, fieldState } = useController({name,control, });

  return (
    <TextField
    {...field}
      name={name}
      label={label}
      value={field.value ?? ""}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      variant ="outlined"
      fullWidth
    />
  );
}

