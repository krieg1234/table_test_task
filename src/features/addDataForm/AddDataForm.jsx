import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectTableFields } from '../../app/dataSlice';
import { Col, Form, Row,Button, Accordion } from 'react-bootstrap';
import { addData } from '../../app/dataSlice';

 export function AddDataForm(props) {
  const dispatch=useDispatch();
  const formFields=useSelector(selectTableFields);
  const allData=useSelector((state)=>state.data.allData);
  const defaultInputs=formFields.reduce((acc,field)=>({...acc,[field]:''}),{});
  const formik = useFormik({
     initialValues: {...defaultInputs},
     validationSchema: Yup.object({
       id: Yup.string() 
        .matches(/^[0-9]{1,4}$/,'Неверный формат id') //валидные цифры
        .required('Заполните')
        .test('duplicateId', 'Дублирование Id запрещено',  (value)=>!allData.includes(Number(value))),
       firstName: Yup.string() 
        .matches( /^([A-Z]{1}[a-z]{2,20})$/,'Неверный формат имени') //валидные буквы и первая заглавная
        .required('Заполните'),
       lastName: Yup.string()
        .matches( /^([A-Z]{1}[a-z]{2,20})$/,'Неверный формат фамилии') //валидные буквы и первая заглавная
        .required('Заполните'),
       email: Yup.string()
        .email('Неверный формат email') //валидные форматы мэйл с @ и .
        .required('Заполните'),
       phone: Yup.string()
        .required('Заполните') 
        .matches(/^[(]{1}[0-9]{3}\)[0-9]{3}[-]{1}[0-9]{4}$/, 'Неверный формат номера') //валидны (ххх)ххх-хххх цифры
     }),
     onSubmit: values => {
      dispatch(addData(values));
     },
   });
   const dataStatus=useSelector((state)=>(state.data.status));
   return (
     <Accordion>
       <Accordion.Toggle as={Button} variant='link' eventKey='0'>Добавить</Accordion.Toggle>
       <Accordion.Collapse eventKey='0'>
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
              <Button disabled={dataStatus!=='success'} type='submit'>Добавить в таблицу</Button>
            </Col>            
          </Row>
        </Form>
       </Accordion.Collapse>
     </Accordion>
    
   );
 };