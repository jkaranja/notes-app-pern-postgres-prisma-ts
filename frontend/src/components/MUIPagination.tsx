import { Button, Pagination, PaginationItem, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

type MUIPaginationProps = {
  count: number;
  page: number;
  redirect?: string;
  changePage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

const MUIPagination = ({
  count,
  page,
  redirect,
  changePage,
  itemsPerPage,
  setItemsPerPage,
}: MUIPaginationProps) => {
  const handleItemsPerPage = (items: number) => {
    //reset current page to page 1
    changePage(1);
    //change items per page
    setItemsPerPage(items);
  };

  return (
    <Grid2 container>
      <Grid2 flexGrow={1}>
        <Pagination
          //classes={{ ul: classes.ul }}
          count={count}
          page={page}
          //size="small"
          onChange={(event, value) => changePage(value)} //handle click & pass btn value=page//
          color="secondary"
          variant="outlined"
          shape="rounded"
          siblingCount={4}
          showFirstButton
          showLastButton
          //not needed with onChange//only for adding sx/styles
          renderItem={(item) => (
            <PaginationItem
              sx={{ mb: 1 }}
              {...item}
              // component={Link}//supposed to replace onChange above////not displaying active btn color//end btn going beyond range/don't use////
              // to={`${redirect}=${item.page}`}
            />
          )}
        />
      </Grid2>
      <Grid2>
        <PaginationItem
          page={10}
          selected={itemsPerPage === 10}
          variant="outlined"
          shape="rounded"
          color="secondary"
          onClick={() => handleItemsPerPage(10)}
        />

        <PaginationItem
          color="secondary"
          page={30}
          selected={itemsPerPage === 30}
          variant="outlined"
          shape="rounded"
          onClick={() => handleItemsPerPage(30)}
        />

        <PaginationItem
          color="secondary"
          selected={itemsPerPage === 50}
          page={50}
          variant="outlined"
          shape="rounded"
          onClick={() => handleItemsPerPage(50)}
        />

        <Typography component="span" px={1}>
          Per page
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default MUIPagination;
