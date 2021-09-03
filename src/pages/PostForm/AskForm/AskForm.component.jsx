import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addPost, updatePost} from '../../../redux/posts/posts.actions';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor.component';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import './AskForm.styles.scss';
import {Redirect} from 'react-router-dom';

const AskForm = ({auth: { user }, addPost, updatePost, post: {post, updated, loading}, postId}) => {
  const [toNext, setToNext] = useState(false)
  const initialValues = { title: post?.title, content: post?.content, image: post?.image};
  const validationSchema = Yup.object().shape({
    title: Yup.string()
                .required("Title is required"),
    content: Yup.string()
                .required("content is required"),
    image: Yup.string()
  })

  const removeImg = (setFieldValue) => {
    setFieldValue('image', '');
  }
  useEffect(()=>{
    if (updated) setToNext(true);
  },[updated])

  if (toNext) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('content', values.content);
          formData.append('postImage', values.postImage);
          (postId) ? updatePost(formData, postId) : addPost(formData);
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
      {({ errors, touched, setFieldValue, values, handleChange, handleBlur }) => (
        <Form>
          <div className='question-form p16 s-card'>
            <div className='question-layout'>
              <div className='title-grid'>
                <label className='form-label s-label'>
                  <span className="field-title">Title</span>
                  <div className='title-desc fw-normal fs-caption'>
                    Be specific and imagine you’re asking a question to another
                    person
                  </div>
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
                {!values.image &&<input 
                  type="file"
                  className="form-control image-field"
                  id="postImage"
                  name="postImage"
                  onChange={(event) => {
                    setFieldValue("postImage", event.currentTarget.files[0]);
                  }}
                />}
                {values.image && 
                  <div class="img-wrap">
                    <span className="close" onClick={()=>removeImg(setFieldValue)}>&times;</span>
                    <img src={values.image} alt="" />
                </div>
                }
              </div>
              <div className='body-grid'>
                <label className='form-label s-label fc-black-800'>
                <span className="field-title">Body</span>
                  <div className='body-desc fw-normal fs-caption fc-black-800'>
                    Include all the information someone would need to answer your
                    question
                  </div>
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
              {loading && <div class="fa fa-spinner fa-spin mr-2"></div>}
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
  updatePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, {addPost, updatePost})(AskForm);
