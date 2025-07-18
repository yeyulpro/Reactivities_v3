
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { DateTimePicker, type DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';



type Props<T extends FieldValues> = {

} & (UseControllerProps<T> & DateTimePickerProps)

export default function DateTimeInput<T extends FieldValues>({ name, control, label }: Props<T>) {

    const { field, fieldState } = useController({ name, control })

    return (
        <DateTimePicker
            {...field}
            value={field.value ? new Date(field.value) : null}
            onChange={value=>field.onChange(value??null)}
            label={label}
            name={name}
            slotProps={{
                textField: {
                    onBlur:field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    fullWidth:true
                   
                }
            }}









        />
    )
}
