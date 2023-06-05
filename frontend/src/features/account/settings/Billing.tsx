import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { User } from "../../../types/user";

type BillingProps = {
  user: User;
};
const Billing = ({ user }: BillingProps) => {
  //pricing plans
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h6" gutterBottom mb={3}>
        Billing/subscriptions
      </Typography>
      <List>
        <Typography variant="h6" gutterBottom pt={3} px={2}>
          Subscription Plan
        </Typography>
        {/* <ListSubheader>Subscription Plan</ListSubheader> */}
        <ListItem>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Monthly
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        </ListItem>

        {[...Array(5)].map((item, i) => {
          return (
            <ListItem divider={i !== 4} dense>
              {/* <ListItemButton>//use <Radio/> alone since form control label must have label else TS error */}
              <ListItemIcon>
                <RadioGroup value={value} onChange={handleChange}>
                  <FormControlLabel
                    value={i}
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </ListItemIcon>
              <ListItemText primary="Free" secondary="Up to 2 team members" />
              <Typography variant="h6">$30</Typography>
              {/* </ListItemButton> */}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Billing;
