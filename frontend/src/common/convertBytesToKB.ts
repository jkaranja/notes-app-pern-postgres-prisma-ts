import React from "react";

const convertBytesToKB = (bytes: number) => {
  const KILO_BYTES_PER_BYTE = 1000;
  const KILO_BYTES = Math.round(bytes / KILO_BYTES_PER_BYTE);

  return KILO_BYTES;
};

export default convertBytesToKB;
