import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import store from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";

const Prefetch = () => {
  //prefetching before you navigate to page eg when you hover over a menu item, next btn, link etc
  //use usePrefetch //don't run auto but returns a trigger fn that you can call

  //USING PREFETCH HOOK
  // const prefetchUser = usePrefetch("getUser"); //or define all options here prefetch("getUser", 4, {force: true, ifOlderThan..})//4 is url param for the endpoint query(id)

  //<button onMouseEnter={() => prefetchUser(4, { ifOlderThan: 35 })}>//ifOlderThan in sec checks if the last similar query time and current time is greater than it, if true prefetch//force: true overrides this.
  //<button onMouseEnter={() => prefetchUser(4, { force: true })}> //force forces refetching even when cache exists

  //PREFETCH ON MOUNT USING USE EFFECT
  //RTK SITE
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(apiSlice.util.prefetch(endpoint, arg, options));
  //   }, []);

  //DAVE//ADDED AS A ROUTE COMPONENT
  
//default on mount query args
const queryArgs = {
  currentPage: 1,
  itemsPerPage: 10,
  debouncedSearchTerm: "",
  dateFilter: {},
}


  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", queryArgs, { force: true })
    );
    // store.dispatch(
    //   usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    //);
  }, []);

  return <Outlet />;
};

export default Prefetch;
