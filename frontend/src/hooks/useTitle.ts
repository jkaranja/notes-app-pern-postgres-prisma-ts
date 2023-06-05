import { EffectCallback, useEffect } from "react";

const useTitle = (title: string) => {
  //type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
  //type EffectCallback = () => (void | Destructor); //return void or cleanup function if used

  //don't have to pass EffectCallback type//return type is inferred as EffectCallback

  //NOTE: the cleanup function/destructor should not return anything eg: can't do: return () => document.title = prevTitle;

  useEffect((): ReturnType<EffectCallback> => {
    const prevTitle = document.title;
    document.title = title;

    //return void or cleanup function
    return () => {
      //the cleanup function/Destructor should always return void
      document.title = prevTitle;
    };
  }, [title]);
};

export default useTitle;
