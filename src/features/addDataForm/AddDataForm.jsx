import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectTableFields } from '../../app/dataSlice';
import { Col, Form, Row,Button } from 'react-bootstrap';
import { addData } from '../../app/dataSlice';

 export function AddDataForm(props) {
  const dispatch=useDispatch();
  const formFields=useSelector(selectTableFields);
  const defaultInputs=formFields.reduce((acc,field)=>({...acc,[field]:''}),{});
  const formik = useFormik({
     initialValues: {...defaultInputs},
     validationSchema: Yup.object({
       id: Yup.number('Введите число') //проверь повторки
       .required('Заполните'),
       firstName: Yup.string() //валидируй буквы
      .matches(/\d/,'Буквы')
       .required('Заполните'),
       lastName: Yup.string() //валидируй буквы
         .required('Заполните'),
       email: Yup.string().email('Неверный формат email').required('Заполните'),
       phone: Yup.string()
        .required('Заполните') //валидируй формат
        // .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Неверный формат номера')
     }),
     onSubmit: values => {
      dispatch(addData(values));
     },
   });
   return (
     <Form onSubmit={formik.handleSubmit}>
      <Row>
            {formFields.map(field=>(
              <Col key={field+'input'}>
                <Form.Group>
                  <Form.Label>{field}</Form.Label>
                  <Form.Control
                    id={field}
                    name={field}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field]} 
                  />
                  {formik.touched[field] && formik.errors[field] ? (
                    <Form.Text>{formik.errors[field]}</Form.Text>
                    ) : null}
                </Form.Group>
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <Button type='submit'>Добавить в таблицу</Button>
            </Col>            
          </Row>


       {/* <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.firstName}
       />
       {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.firstName}</div>
       ) : null}
 
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.lastName}
       />
       {formik.touched.lastName && formik.errors.lastName ? (
         <div>{formik.errors.lastName}</div>
       ) : null}
 
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       />
       {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
 
       <button type="submit">Submit</button> */}
     </Form>
   );
 };