import React, {useState} from 'react';
import {Form, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../app/dataSlice';

export function OptionsBar(props){
  const dispatch=useDispatch();
  const { setTextFilter, setCurrentDataId}=props;

  const [textFilterInputValue, setTextFilterInputValue]=useState('');
  const [displayMode, setDisplayMode]=useState('small');//строчные параметры не очень

  //лоя блокировки кнопок при загрузке данных
  const dataStatus=useSelector((state)=>(state.data.status));

  return (
  <div className='optionBar'>
    <div className='displayMode-options my-5'>
      <p>Набор данных:</p>
      <ButtonGroup>
        <Button disabled={displayMode==='big'||dataStatus!=='success'} onClick={()=>{
          setCurrentDataId(undefined);
          setDisplayMode('big');
          dispatch(fetchData('big'))}}>Большой</Button>
        <Button disabled={displayMode==='small'||dataStatus!=='success'} onClick={()=>{
          setDisplayMode('small');
          dispatch(fetchData('small'))}}>Маленький</Button>
      </ButtonGroup>
      
    </div>
    <div className='textFilte-form my-5'>
      <Form onSubmit={(e)=>{
        e.preventDefault();
        setTextFilter(textFilterInputValue);
      }}>
        <Form.Group as={Row} >
          <Col sm={6}>
            <Form.Control 
              type='search' 
              placeholder='поиск по таблице...' 
              value={textFilterInputValue} 
              onChange={(e)=>setTextFilterInputValue(e.target.value)} /> 
          </Col>
          <Col sm={6} style={{textAlign:'left'}}>
              <Button type='submit' disabled={!textFilterInputValue||dataStatus!=='success'}>Поиск</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
    
  </div>
    
  )
}