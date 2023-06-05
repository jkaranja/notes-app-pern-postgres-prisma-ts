import fileUploadMutation from "../../api/fileUploadMutation";
import { apiSlice } from "../../app/api/apiSlice";
import { Note, NotesArg, NotesResponse } from "../../types/note";



export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //fetch Notes //ResultType > QueryArg (passes type to query: (arg: this arg))
    //NotesResult i.e NotesResult is the type of returned data or the return value of transformRes in used
    //use void if query: () //no queryArg
    getNotes: builder.query<NotesResponse, NotesArg>({
      query: ({
        currentPage,
        itemsPerPage,
        debouncedSearchTerm,
        dateFilter,
      }) => ({
        url: `/notes?page=${currentPage}&size=${itemsPerPage}&search=${debouncedSearchTerm}&fromDate=${
          dateFilter?.fromDate || ""
        }&toDate=${dateFilter?.toDate || ""}`,
        // validateStatus: (response, result) => {
        //   return response.status === 200 && !result.isError;
        // },
      }),
      //Note: if using transformRes, return type in builder.query should match final formatted data returned by transform res
      //input type for transformResponse must also be specified, to indicate the type that the initial query returns i.e see rawResult type below
      // transformResponse: (rawResult: {pages: number; notes: Note[]}, meta) => {
      //     return rawResult.notes //if this was the result, ReturnType under builder.query would be Note[]
      // }

      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,

      providesTags: (result, error, arg) =>
        // is result available?//data from db form = {pages, notes[]}
        result?.notes
          ? [
              ...result?.notes?.map(({ noteId: id }) => ({
                type: "Note" as const,
                id,
              })),
              { type: "Note", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Note", id: "LIST" }], //if initially fetch returned 'no record found' error
    }),
    //get note by id
    getNote: builder.query<Note, number>({
      query: (id) => ({
        url: `/notes/${id}`,
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
      providesTags: (result, error, id) => [{ type: "Note", id }],
    }),
    //add new note//noteData is FormData object
    addNote: builder.mutation<{ message: string }, FormData>({
      query: (noteData) => ({
        url: `/notes`,
        method: "POST",
        // fetchBaseQuery by default automatically adds `content-type: application/json` to
        // the Headers//you can also set headers in prepareHeaders inside fetchBaseQuery({})
        //don't add this header else: Multipart: Boundary not found
        //fetchBaseQuery which uses Fetch API underneath will add the correct content-type from body
        // headers: {
        //   "Content-Type": "multipart/form-data;",
        // },
        body: noteData,
      }),
      //queryFn: fileUploadMutation({ url: "/notes" }),

      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
      //refetch after new record is added
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: "LIST" }],
    }),
    //update note
    updateNote: builder.mutation<
      { message: string },
      { id: number; noteData: FormData }
    >({
      query: ({ noteData, id }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        //fetchBaseQuery which uses Fetch API underneath will add the correct content-type from body
       
        body: noteData,
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    //delete Note
    deleteNote: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
      invalidatesTags: (result, error, id) => [{ type: "Note", id }],
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
