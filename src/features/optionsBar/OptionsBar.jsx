import React, {useState} from 'react';
import {Form, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../app/dataSlice';

export function OptionsBar(props){
  const dispatch=useDispatch();
  const { setTextFilter}=props;
  const [textFilterInputValue, setTextFilterInputValue]=useState('');
  const [displayMode, setDisplayMode]=useState('small');
  return (
  <div className='optionBar'>
    <div className='displayMode-options my-5'>
      <p>Набор данных:</p>
      <ButtonGroup>
        <Button disabled={displayMode==='big'} onClick={()=>{
          setDisplayMode('big');
          dispatch(fetchData('big'))}}>Большой</Button>
        <Button disabled={displayMode==='small'} onClick={()=>{
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
              <Button type='submit' disabled={!textFilterInputValue}>Поиск</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
    
  </div>
    
  )
}