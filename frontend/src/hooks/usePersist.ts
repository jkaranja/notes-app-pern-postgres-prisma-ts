import { useState, useEffect } from "react";

const usePersist = () => {
  const persistItem = JSON.parse(localStorage.getItem("persist") as string);
  //default is true if first timer when localStorage has not been set=null//else use user preference
  const [persist, setPersist] = useState(
    persistItem !== null ? persistItem : true
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist] as const;//infer a tuple instead of (typeof persist | typeof setPersist)[]
};
export default usePersist;
