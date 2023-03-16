import {createRef, useState} from 'react';

  export const UiFileInputButton = (props) => {
    const fileInputRef = createRef();
    const formRef = createRef();
    const [file, setFile] = useState();
    
    const onClickHandler = (event) => {
      
      fileInputRef.current?.click();
      console.log(fileInputRef)
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setFile(i);
        
      }
      
    };
  
    const onChangeHandler = (event) => {
      if (!event.target.files?.length) {
        return;
      }
      const body = new FormData();
      console.log(file)
      body.append("file", file);    
      props.onChange(body);
      formRef.current?.reset();
      
      /*if (!event.target.files?.length) {
        return;
      }
  
      const formData = new FormData();
  
      Array.from(event.target.files).forEach((file) => {
        formData.append(event.target.name, file);
      });
  
      props.onChange(formData);
  
      formRef.current?.reset();*/
    };
  
    return (
      <form ref={formRef}>
       
        <button type="button" onClick={onClickHandler}>
          {props.label}
        </button>
        <input
          accept={props.acceptedFileTypes}
          multiple={props.allowMultipleFiles}
          name={props.uploadFileName}
          onChange={onChangeHandler}
          ref={fileInputRef}
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