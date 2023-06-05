import { Typography } from "@mui/material";
import React from "react";

type IntroProps = {
  children: JSX.Element | string;
};

const Intro = ({ children }: IntroProps) => {
  return (
    <Typography fontWeight={500} variant="h5" align="left" gutterBottom pb={2}>
      {children}
    </Typography>
  );
};

export default Intro;
