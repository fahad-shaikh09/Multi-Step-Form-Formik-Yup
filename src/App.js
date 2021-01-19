import React from "react"
import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik"




function App() {


  return (
    <div className="App">
      <h1>Multi Step form using Formik and Yup</h1>

      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={values => {
          const errors = {}
          console.log("Values in validate prop: ", values)
          if (!values.email) {
            errors.email = "Email is required"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          else if (!values.password) {
            errors.password = "Password is required"
          }
          return errors;

        }

        }
        onSubmit={ (values , {setSubmitting}) => {
          console.log("Values in onSubmit func: ", values)
          setTimeout(() => {
            setSubmitting(false)
          }, 400);
        }

        }


      >
        {
          ({ isSubmitting }) => (
            <Form className="formContainer">
              <h3>Enter Email:</h3>
              <Field type="email" name="email" />
              <ErrorMessage className="errorMsg" name="email" component="div" />

              <h3>Enter Password:</h3>
              <Field type="password" name="password" />
              <ErrorMessage className="errorMsg" name="password" component="div" />
              <br></br>              <br></br> 
             
              <button type="submit" disabled={isSubmitting}> Submit</button>
            </Form>
          )
        }
      </Formik>
    </div>
  );
}

export default App;
