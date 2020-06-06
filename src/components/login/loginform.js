import {Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
export const LoginForm = props => {
    return (
        <Formik
            initialValues = {{username:'',password:''}}
            validate = {
                values => {
                    const errors = {}
                    if(!values.username){
                        errors.username = 'Username is required'
                    }
                    if(values.password.length < 8){
                        errors.password = 'Password length should be 8'
                    }
                    if(!values.password){
                        errors.password = 'Password is required'
                    }

                    return errors;
                }
            }
            onSubmit = {
                (values,{setSubmitting}) => {
                    setSubmitting(false)
                    props.formSubmission(values)
                }
            }
        >
            {
                ({
                    isSubmitting
                }) => 
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field 
                            type="text" 
                            name='username' 
                            placeholder='username' 
                            className="form-control"
                            />
                        </div>
                        <ErrorMessage name='username'>{msg => <p className="text-danger">{msg}</p> }</ErrorMessage>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                            type="password" 
                            name='password' 
                            placeholder='Password' 
                            className="form-control"
                            />
                        </div>
                        <ErrorMessage name='password'>{msg => <p className="text-danger">{msg}</p> }</ErrorMessage>

                        <button className="btn btn-success w-100" type='submit' disabled={isSubmitting}>Login</button>
                    </Form>
                
            }
        </Formik>
    )
}
