import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography,
  type TextFieldProps,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { LocationlQSuggestion } from "../../../lib/types";
import axios from "axios";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T> &
  TextFieldProps;

export default function LocationInput<T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: Props<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    rules: { required: `hey!! Listen!! ${name} must be requred!!` },
  });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationlQSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "");

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue || "");
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=pk.a34e0b9aa2ff9695e5a9f43b03d9ea8c&limit=5&dedupe=1&`;

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const res = await axios.get<LocationlQSuggestion[]>(
            `${locationUrl}q=${query}`
          );
          setSuggestions(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationUrl]
  );
  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSelect = (location: LocationlQSuggestion) => {
    const city =
      location.address?.city ||
      location.address?.town ||
      location.address?.village;
    const venue = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;

    setInputValue(venue);
    field.onChange({ city, venue, latitude, longitude });
    setSuggestions([]);
  };
  return (
    <Box>
      <TextField
        {...field}
        {...rest}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)} // you could ve put field.value. however, this typing in
        //  the textfield should call api as well/at the same time, that s why field.onChange(value) should separately be written again.① 폼 상태(RHF)에 값 반영이 여기서 이루어 진것이다
        fullWidth
        label={label}
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      <List sx={{borderRadius: 1 }}>
        {suggestions.map((suggestion) => (
          <ListItemButton
            divider
            key={suggestion.place_id}
            onClick={() => handleSelect(suggestion)}
          >
            {suggestion.display_name}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
