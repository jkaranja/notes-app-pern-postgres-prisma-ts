import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

//https://react-dropzone.js.org/
//https://blog.openreplay.com/create-a-drag-and-drop-zone-in-react-with-react-dropzone
//https://www.bezkoder.com/drag-drop-file-upload-react-hooks/

interface DropzoneProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const Dropzone = ({ selectedFiles, setSelectedFiles }: DropzoneProps) => {
  /* -------------------------------
/BYTES TO KILOBYTES FOR PREVIEW
---------------------------------*/
  const KILO_BYTES_PER_BYTE = 1000;
  const convertBytesToKB = (bytes: number) =>
    Math.round(bytes / KILO_BYTES_PER_BYTE);

  /* -----------------------------------------------------
/ON DROP /AFTER FILES ARE DROPPED OR SELECTED WITH OPEN
---------------------------------------------------------*/
  //use acceptedFiles instead//not updating state correctly cause of use call back//replacing instead of adding
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // if (acceptedFiles.length > 0) {
    //   setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    // }
  }, []);

  /* ----------------------
   /useDropzone HOOK
-------------------------*/
  //use useDropzone({noClick: true, noKeyboard: true) to prevent opening two dialogs when using label as a root div and
  //when using a button with onClick ={open} upload btn inside the root div
  //either use the btn outside or have it inside and disable click on button on roo div
  //when you click a btn inside of it
  //the hook also support onDragLeave, onDragOver, onDragEnter, onError, isDragAccept,
  // isDragReject, isFocused,isDragActive=true on area/false out of area
  //for options inside ({//accept: /'image/*' or {image: 'image/*'}, multiple=true default , maxFiles:2})
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    open, //open normal file selector and adds files to acceptedFiles
    acceptedFiles,
  } = useDropzone({ onDrop, noClick: true, noKeyboard: true });
  //can also get files like this// use this instead of onDrop //not updating state correctly
  //   const files = acceptedFiles.map((file) => (
  //     <li key={file.path}>{file.path}</li>
  //   ));

  /* --------------------------------------------------------------
   /UPDATE STATE// MUST BE INSIDE USE EFFECT OW INFINITE RENDER
-------------------------------------------------------------------*/
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    }
  }, [acceptedFiles]);

  /* ----------------------
/REMOVE FILE FROM LIST
-------------------------*/
  const handleDeleteBtn = (id: number) => {
    setSelectedFiles((prev) => {
      return prev.filter((file, i) => i !== id);
    });
  };

  return (
    <div className="dropzone-wrapper">
      {/* getRootProps can be applied to an element//PASS CLASS/ID AS BELOW */}
      <div
        style={{ borderColor: isDragActive ? "#2196f3" : undefined }}
        {...getRootProps({
          className: `dropzone`,
        })}
      >
        {/* getInputProps must be applied to an input only */}
        <input className="input-zone" {...getInputProps()} />

        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <p className="dropzone-content">Drag and drop files here or</p>
          )}

          <button type="button" onClick={open} className="dropzone-upload-btn">
            Upload files
          </button>
        </div>
      </div>
      <div>
        {selectedFiles.map((file, i) => (
          <div className="dropzone-file-preview" key={i}>
            <span>{`${file?.name?.slice(0, 28)}...${file?.name
              ?.split(".")
              .pop()}`}</span>
            <span>{convertBytesToKB(file.size)} kb</span>

            <button
              onClick={() => handleDeleteBtn(i)}
              className="dropzone-close-btn"
              type="button"
            >
              {" "}
              X{" "}
            </button>
          </div>
        ))}
        {/* <div>{files}</div> */}
      </div>

      {/* or use wrapper component for the hook//bt this only gives you onDrop option/no isDragActive
      <Dropzone noClick noKeyboard onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone> */}
    </div>
  );
};

export default Dropzone;
