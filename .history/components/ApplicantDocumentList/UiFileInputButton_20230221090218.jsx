import { useEffect, useState } from "react";

  export const UiFileInputButton = (props) => {
    //const fileInputRef = createRef();
    //const formRef = createRef();
    const [file, setFile] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

    const onClickHandler = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        
        setFile(i);
        setCreateObjectURL(URL.createObjectURL(i));
        console.log(file)
      }
    };
  
    const onChangeHandler = (event) => {
      if (!event.target.files?.length) {
        return;
      }
  
      const formData = new FormData();
  
      Array.from(event.target.files).forEach((file) => {
        formData.append(event.target.name, file);
      });
  
      props.onChange(formData);
  
      //formRef.current?.reset();
    };
  
    return (
      <form  >
        <button type="button" onClick={onClickHandler}>
          {props.label}
        </button>
        <input
          name={props.uploadFileName}
          onChange={onChangeHandler}
          style={{ display: 'none' }}
          type="file"
        />
      </form>
    );
  };
  
  UiFileInputButton.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: false,
  };