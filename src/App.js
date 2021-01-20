import React from "react"
import {Card, CardContent, Typography} from "@material-ui/core"
import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {CheckboxWithLabel, TextField} from "formik-material-ui"
import { money, number } from "yup";


function App() {


  return (
    <div className="App">
      <h1>Multi Step form using Formik and Yup</h1>

      <Formik
        initialValues={{
          fname: "",
          lname: "",
          age:"",
          email: "",
          password: "",
          money: 0,
          acceptedTerms: false,
        }}

        validationSchema={Yup.object({
          fname: Yup.string().max(15, "15 characters max").required("Required"),
          lname: Yup.string().max(15, "15 characters max").required("Required"),
          email: Yup.string().email("invalid email address").required("Required"),
          password: Yup.string().min(6, 'Password is too short.')
          .max(20, 'Password is too long.')
          .required('This field is required.'),
          age: Yup.number().max(99, "15 characters max").required("Required"),
          money: Yup.number().when("acceptedTerms" , {
            is: true,
            then: number().required().min(1000),
            otherwise: number().required()
          }),
          acceptedTerms: Yup.boolean().required("Required").oneOf([true], "You must accept Terms & Consitions"),
        })
        }
        onSubmit={(values, { setSubmitting }) => {
          console.log("Values in onSubmit func: ", values)
          setTimeout(() => {
            setSubmitting(false)
          }, 400);
        }
        }
      >

        {/* // validate={values => {
          // const errors = {}
          //   console.log("Values in validate prop: ", values)
          //   if (!values.email) {
          //     errors.email = "Email is required"
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = 'Invalid email address';
          //   }
          //   else 
        //   if (!values.password) {
        //     errors.password = "Password is required"
        //   }
        //   return errors;
        // }
        // }
 */}


        {
          ({ isSubmitting }) => (
            <Form className="formContainer" autoComplete="false">
              <Field component={TextField} type="text" name="fname" label="First Name"/>
              <ErrorMessage className="errorMsg" name="fname" component="div" />

              <Field component={TextField} type="text" name="lname" label="Last Name" />
              <ErrorMessage className="errorMsg" name="lname" component="div" />

              <Field component={TextField} type="number" name="age" label="Age" />
              <ErrorMessage className="errorMsg" name="age" component="div" />


              <Field component={TextField} type="number" name="money" label="Money" />
              <ErrorMessage className="errorMsg" name="money" component="div" />


              <Field component={TextField} type="email" name="email" label="Enter Email" />
              <ErrorMessage className="errorMsg" name="email" component="div" />

              <Field component={TextField} type="password" name="password" label="Enter Password" />
              <ErrorMessage className="errorMsg" name="password" component="div" />
              <br></br>              <br></br>

              <Field component={CheckboxWithLabel} type="checkbox" name="acceptedTerms" Label={{label: "Accept Terms?"}} />

              <br></br>

              <button type="submit" disabled={isSubmitting}> Submit</button>
            </Form>
          )
        }

      </Formik>
    </div>
  );
}

export default App;
