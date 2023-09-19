import {createRef, useState} from 'react';

  export const UiFileInputButton = (props) => {
    const fileInputRef = createRef();
    const formRef = createRef();
    const [file, setFile] = useState();
    
    const onClickHandler = () => {
      
      fileInputRef.current?.click();
      
      
    };
  
    const onChangeHandler = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setFile(i);
        console.log("test :"+ event.target.files[0])
      }
      const body = new FormData();
       console.log( "test2: " + file)
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