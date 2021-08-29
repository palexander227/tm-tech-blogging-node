import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addPost} from '../../../redux/posts/posts.actions';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor.component';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import './AskForm.styles.scss';

const AskForm = ({auth: { user }, addPost}) => {
  const initialValues = { title: '', content: '', image: ''};
  const validationSchema = Yup.object().shape({
    title: Yup.string()
                .required("Title is required"),
    content: Yup.string()
                .required("content is required"),
    image: Yup.string()
  })

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append('postImage', values.postImage);
          formData.append('title', values.title);
          formData.append('content', values.content);
          formData.append('userId', user.id);
          addPost(formData);
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          {errors.content}
          <div className='question-form p16 s-card'>
            <div className='question-layout'>
              <div className='title-grid'>
                <label className='form-label s-label'>
                  <span className="field-title">Title</span>
                  <p className='title-desc fw-normal fs-caption'>
                    Be specific and imagine you’re asking a question to another
                    person
                  </p>
                </label>
                <Field
                  className={'form-control ' + (errors.title && touched.title ? 'invalid' : '')}
                  type='text'
                  name='title'
                  id='title'
                  placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                />
              </div>
              <div className='title-grid'>
                <label className='form-label s-label'>
                  <span className="field-title">Image</span>
                </label>
                <input 
                  type="file"
                  class="form-control image-field"
                  id="postImage"
                  name="postImage"
                  onChange={(event) => {
                    setFieldValue("postImage", event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div className='body-grid'>
                <label className='form-label s-label fc-black-800'>
                <span className="field-title">Body</span>
                  <p className='body-desc fw-normal fs-caption fc-black-800'>
                    Include all the information someone would need to answer your
                    question
                  </p>
                </label>
                <div className='s-textarea rich-text-editor-container'>
                <Field
                    component={RichTextEditor}
                    name="content"
                    type="content"
                    render={({ field, form }) => (
                      <RichTextEditor
                        {...field}
                        handleChange={data => {
                          form.setFieldValue('content', data)
                        }}
                      />
                    )}
                />
                </div>
              </div>
            </div>
          </div>
          <div className='post-button mt-4'>
            <button
              className='btn btn-primary w-25'
              id='submit-button'
              name='submit-button'
              type='submit'
            >
              Post
            </button>
          </div>
        </Form>
      )}
      </Formik>
    </Fragment>
  );
};

AskForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addPost})(AskForm);
