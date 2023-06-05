import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useGetUserQuery } from "../../user/userApiSlice";
import Intro from "../../../components/Intro";
import showToast from "../../../common/showToast";
import Billing from "./Billing";
import Notifications from "./Notifications";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import ChangePwd from "./ChangePwd";
import TwoFactor from "./TwoFactor";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
//custom tab panel
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

//custom tab
const MyTab = styled(Tab)(() => ({
  textTransform: "none",
  padding: 0,
  marginRight: 40,
  minWidth: 0,
  alignItems: "start",
}));

//-----------------------------------------------

//profile component
const Settings = () => {
  const [tabValue, setTabValue] = useState(0);   
   
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleTabChange = (event: React.SyntheticEvent, tabValue: number) => {
   setTabValue(tabValue);
 };


  const {
    data: user,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  /**----------------------------------------
   SHOW TOASTS & RESET PWD FORM
 ---------------------------------------------*/
  useEffect(() => {
    showToast({
      message: error,
      isLoading: isFetching,
      isSuccess,
      isError,
    });
  }, [isSuccess, isError, isFetching]);

  return (
    <Box>
      <Intro>Settings</Intro>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          // variant="fullWidth"
        >
          <MyTab
            //   icon={<PersonOutlineOutlinedIcon />}
            //   iconPosition="start"
            label={
              <Box sx={{ display: "flex" }}>
                <PersonOutlineOutlinedIcon />
                <Typography pl={1}>Account</Typography>
              </Box>
            }
            
          />
          <MyTab
            label={
              <Box sx={{ display: "flex" }}>
                <NotificationsNoneOutlinedIcon />
                <Typography pl={1}>Security</Typography>
              </Box>
            }
            value={1}
          />
          <MyTab
            label={
              <Box sx={{ display: "flex" }}>
                <TurnedInNotOutlinedIcon />
                <Typography pl={1}>Billing</Typography>
              </Box>
            }
            value={2}
          />
          <MyTab
            label={
              <Box sx={{ display: "flex" }}>
                <TurnedInNotOutlinedIcon />
                <Typography pl={1}>Notifications</Typography>
              </Box>
            }
            value={3}
          />
        </Tabs>
      </Box>

      {/* ----------------------UPDATE/DEL ACCOUNT TAB -------------------------*/}
      <TabPanel value={tabValue} index={0}>
        <EditProfile user={user!} />
        <DeleteAccount user={user!} />
      </TabPanel>

      {/* ---------------------SECURITY TAB/PWD + 2FACTOR------------------------ */}
      <TabPanel value={tabValue} index={1}>
        <ChangePwd user={user!} />
        <TwoFactor user={user!} />
      </TabPanel>

      {/* ---------------------BILLING TAB------------------------ */}
      <TabPanel value={tabValue} index={2}>
        <Billing user={user!} />
      </TabPanel>

      {/* ---------------------NOTIFICATION TAB------------------------ */}
      <TabPanel value={tabValue} index={3}>
        <Notifications user={user!} />
      </TabPanel>
    </Box>
  );
};

export default Settings;
