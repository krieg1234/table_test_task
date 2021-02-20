import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export function DetailData(props){
  const {currentDataId}=props;
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    address,
    description
  }=useSelector((state)=>state.data.dataById[currentDataId]);
//с проверками на случай отсутствия данных об адресе (возможно стоит сделать красивее)
  return (
    <div className='data-details' style={{textAlign:'left'}}>
      <Row>
        <Col md={6}>
          <p>Выбран пользователь: <b>{`${firstName} ${lastName}`}</b></p>
          <p>Описание:</p>
          <textarea rows={5} style={{width:'100%'}} value={description?description:'Нет данных'} onChange={()=>(null)} />
          <p>Адрес проживания: <b>{address?address.streetAddress:'Нет данных'}</b></p>
          <p>Город: <b>{address?address.city:'Нет данных'}</b></p>
          <p>Провинция/штат: <b>{address?address.state:'Нет данных'}</b></p>
          <p>Индекс: <b>{address?address.zip:'Нет данных'}</b></p>
        </Col>  
      </Row>      
      
    </div>
  )
}