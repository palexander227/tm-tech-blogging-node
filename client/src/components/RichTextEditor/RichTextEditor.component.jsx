import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import './RichTextEditor.styles.scss';

const MyStatefulEditor = (props) => {

  return (
    <CKEditor
      editor={ BalloonEditor }
      data="<p></p>"
      config={{ckfinder: {
        // Upload the images to the server using the CKFinder QuickUpload command.
        uploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
      }}}
      onReady={ editor => {
        // You can store the "editor" and use when it is needed.
        console.log( 'Editor is ready to use!', editor );
      } }
      onChange={ ( event, editor ) => {
        const data = editor.getData();
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
