import { TextField, useTheme } from "@mui/material";

const FormField = ({
  label = "Subject",
  placeholder = "Enter text",
  value,
  onChange,
  error = "",
  helperText = "",
  ...props
}) => {
  const theme = useTheme();
  return (
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      InputLabelProps={{
        shrink: true, // Keeps the label fixed on top
      }}
      error={!!error}
      helperText={helperText || error}
      sx={{
        backgroundColor: theme.palette.color.inputFieldBackground,
        color: theme.palette.color.inputFieldBackground,
        borderRadius: "10px",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none", // Removes the border
          },
        },
        "& .MuiInputLabel-root": {
          position: "absolute",
          top: "-20px", // Adjusts the position slightly above the input field
          left: "-12px", // Aligns it with padding
          fontSize: "17px", // Optional: Adjust label font size
          color: "black", // Label color (customizable via props)
          fontWeight: "bold", // Makes the label bold
        },
        "&.Mui-focused": {
          color: "black", // Keeps the label color consistent on focus
        },
      }}
      {...props} // Spread any additional props
    />
  );
};

export default FormField;
