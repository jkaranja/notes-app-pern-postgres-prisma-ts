import fileUploadMutation from "../../api/fileUploadMutation";
import { apiSlice } from "../../app/api/apiSlice";
import { Note, NotesResponse } from "../../types/note";

interface NotesArg {
  currentPage: string;
  itemsPerPage: string;
  debouncedSearchTerm: string;
  dateFilter: { toDate: Date; fromDate: Date };
}

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
              ...result?.notes?.map(({ _id: id }) => ({
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
    //add new note//interface for formData = {[key:string]: string | Blob }
    addNote: builder.mutation<Note, { [key: string]: string | Blob }>({
      query: (noteData) => ({
        url: `/notes`,
        method: "POST",
        // fetchBaseQuery by default automatically adds `content-type: application/json` to
        // the Headers//you can also set headers in prepareHeaders inside fetchBaseQuery({})
        headers: {
          "content-type": "multipart/form-data",
        },
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
      Note,
      { id: string | number; [key: string]: string | Blob }
    >({
      query: ({ noteData, id }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: noteData,
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    //delete Note
    deleteNote: builder.mutation<Note, Partial<Note> & Pick<Note, "noteId">>({
      query: (noteId) => ({
        url: `/notes/${noteId}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response, meta, arg) =>
        (response.data as { message: string })?.message,
      invalidatesTags: (result, error, noteId) => [{ type: "Note", noteId }],
    }),
  }),
  //   overrideExisting: false,
});

/**--------------------------------------
 * SUMMARY TYPING QUERY AND MUTATION
 ----------------------------------------*/
 
//TYING OPTIONS FOR QUERY ARG
//MAKE ALL FIELDS OF TYPE post optional
updatePost: build.mutation<Post, Partial<Post>>({})
//make everything optional except id //pick id//stricter than above
//same as type INote = Partial<Note> &  Required<Pick<Note, "_id">>; //with Required 
updatePost: build.mutation<Post, Partial<Post> & Pick<Post, "id">>({}); 
//omit id since record is not created yet
addPost: build.mutation<Post, Omit<Post, 'id'>>({})

//note//as const tells TS to infer type of 'type: "string"' to be the most specific type as possible instead of the broad string type that will raise TS err
...result?.notes?.map(({ noteId: id }) => ({
                type: "Note" as const,
                id,
              })),

//can also be applied to the object type: 
...result.map(({ id }) => ({ type: 'Posts', id } as const)),

//use void if query arg is not passed
getPosts: build.query<PostsResponse, void>({})
//or pass type directly
getPost: build.query<Post, number>({})
//or
deletePost: build.mutation<{ success: boolean; id: number }, number>({})

//Note: if using transformRes, return type in builder.query should match final formatted data returned by transform res
      //input type for transformResponse must also be specified, to indicate the type that the initial query returns i.e see rawResult type below
      // transformResponse: (rawResult: {pages: number; notes: Note[]}, meta) => {
      //     return rawResult.notes //if this was the result, ReturnType under builder.query would be Note[]
      // }



export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
