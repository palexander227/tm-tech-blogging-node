import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './RichTextEditor.styles.scss';

const MyStatefulEditor = (props) => {
  return (
    <CKEditor
      editor={ ClassicEditor }
      data={props.value}
      config={{
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: process.env.REACT_APP_API_URL+'/api/post/file_upload?command=QuickUpload&type=Images&responseType=json',
          mediaEmbed: {previewsInData: true}
          }
      }}
      onReady={ editor => {
        // You can store the "editor" and use when it is needed.
        console.log( 'Editor is ready to use!', editor );
      } }
      onChange={ ( event, editor ) => {
        const data = editor.getData();
        props.handleChange(data);
        console.log( { event, editor, data } );
      } }
      onBlur={ ( event, editor ) => {
        console.log( 'Blur.', editor );
      } }
      onFocus={ ( event, editor ) => {
        console.log( 'Focus.', editor );
      } }
    />
  );
};

export default MyStatefulEditor;
