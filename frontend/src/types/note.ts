//note returnType

export interface NoteFile {
  path: string;
  filename: string;
  mimetype: string;
  size: number;
}

export interface Note {
  noteId: number;
  title: string;
  content: string | undefined;
  deadline: Date;
  isChecked: boolean;
  files: NoteFile[]; //or use Blob to rep a file // Blob extends File interface(File is a TS type for file)
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  pages: number;
  notes: Note[];
  total: number;
}

export interface IDateFilter {
toDate?: Date | string; 
fromDate?: Date | string; 
}

export interface NotesArg {
  currentPage: number;
  itemsPerPage: number;
  debouncedSearchTerm: string;
  dateFilter: IDateFilter;
}

//not used// this is the expected type for appending values to FormData
//but the type for resulting formData object is FormData
export interface FormDataBody {
  [key: string]: string | Blob; //or File if formData object only contains file objects(File is a TS type for file)
}
