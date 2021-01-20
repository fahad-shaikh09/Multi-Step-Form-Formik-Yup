import React, { useState } from "react"
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from "@material-ui/core"
// import './App.css';
import { Formik, Form, Field, FormikConfig, FormikValues } from "formik"
import * as Yup from "yup"
import { CheckboxWithLabel, TextField } from "formik-material-ui"
import { number } from "yup";

const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

function App() {

  return (
    <Card>
      <CardContent>

        <FormikStepper
          initialValues={{
            fname: "",
            lname: "",
            age: 0,
            email: "",
            password: "",
            money: 0,
            acceptedTerms: false,
            address: ""
          }}

          onSubmit={async (values) => {
            await sleep(3000);
            console.log('values', values);
          }}
        >

          <FormikStep label="Personal Data"
            validationSchema={
              Yup.object({
                fname: Yup.string().max(15, "15 characters max").required("Required"),
                lname: Yup.string().max(15, "15 characters max").required("Required"),
                acceptedTerms: Yup.boolean().required("Required").oneOf([true], "You must accept Terms & Consitions"),
              })
            }

          >
            <Box paddingBottom={2}>
              <Field component={TextField} type="text" name="fname" label="First Name" />
              {/* <ErrorMessage className="errorMsg" name="fname" component="div" /> */}
            </Box>

            <Box paddingBottom={2}>
              <Field component={TextField} type="text" name="lname" label="Last Name" />
              {/* <ErrorMessage className="errorMsg" name="lname" component="div" /> */}
            </Box>

            <Box paddingBottom={2}>
              <Field component={CheckboxWithLabel} type="checkbox" name="acceptedTerms" Label={{ label: "Accept Terms?" }} />
            </Box>
          </FormikStep>


          <FormikStep
            label="Financial Status"
            validationSchema={
              Yup.object({
                money: Yup.number().when("acceptedTerms", {
                  is: true,
                  then: number().required().min(1000),
                  otherwise: number().required()
                }),
                age: Yup.number().min(18,"You are too young to open account (min=18 years)").required("required")
              })
            }
          >
            <Box paddingBottom={2}>
              <Field component={TextField} type="number" name="age" label="Age" />
              {/* <ErrorMessage className="errorMsg" name="age" component="div" /> */}
            </Box>

            <Box paddingBottom={2}>
              <Field component={TextField} type="number" name="money" label="Money" />
              {/* <ErrorMessage className="errorMsg" name="money" component="div" /> */}
            </Box>
          </FormikStep>

          <FormikStep label="Detailed Info"
            validationSchema={
              Yup.object({
                email: Yup.string().email("invalid email address").required("Required"),
                password: Yup.string().min(6, 'Password is too short.')
                  .max(20, 'Password is too long.')
                  .required('This field is required.'),
                address: Yup.string().max(100, "City and Country are mandatory").required("Required")
              })
            }
          >
            <Box paddingBottom={2}>
              <Field component={TextField} type="text" name="address" label="Address" />
              {/* <ErrorMessage className="errorMsg" name="address" component="div" /> */}
            </Box>

            <Box paddingBottom={2}>
              <Field component={TextField} type="email" name="email" label="Enter Email" />
              {/* <ErrorMessage className="errorMsg" name="email" component="div" /> */}
            </Box>

            <Box paddingBottom={2}>
              <Field component={TextField} type="password" name="password" label="Enter Password" />
              {/* <ErrorMessage className="errorMsg" name="password" component="div" /> */}
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card >
  );
}

export default App;


export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  // var validationSchema = Yup.object({
  //   fname: Yup.string().max(15, "15 characters max").required("Required"),
  //   lname: Yup.string().max(15, "15 characters max").required("Required"),
  //   email: Yup.string().email("invalid email address").required("Required"),
  //   password: Yup.string().min(6, 'Password is too short.')
  //     .max(20, 'Password is too long.')
  //     .required('This field is required.'),
  //   age: Yup.number().max(99, "15 characters max").required("Required"),
  //   acceptedTerms: Yup.boolean().required("Required").oneOf([true], "You must accept Terms & Consitions"),
  //   address: Yup.string().max(100, "City and Country are mandatory").required("Required")
  // })


  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}


