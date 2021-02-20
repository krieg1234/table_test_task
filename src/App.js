
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useEffect, useState } from 'react';
import { TableComponent } from './features/tableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './app/dataSlice';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { OptionsBar } from './features/optionsBar/OptionsBar';
import { AddDataForm } from './features/addDataForm/AddDataForm';
import { DetailData } from './features/detailData/DetailData';

function App() {
  const dispatch=useDispatch();
  //загрузка данных с сервера
  const dataStatus=useSelector((state)=>({
    status: state.data.status,
    error:state.data.error,
  }));
  useEffect(()=>{
    if (dataStatus.status==='idle'){
      dispatch(fetchData());
    }
  },[dataStatus,dispatch])


  //хуки для настроек
  const [displayMode, setDisplayMode]=useState('smallData') //стринга не круто
  const [sortMode,setSortMode]=useState({
    field:'id',
    isDirect:true, 
  });
  const [textFilter, setTextFilter]=useState('');

    //хук для выбора строки
    const [currentDataId,setCurrentDataId]=useState(undefined);

    //таблица в зависимости от статуса запроса
  const contentByStatus={
    'loading':(<div>Загрузка...</div>),
    'failed':(<div>Ошибка! {dataStatus.error}</div>),
    'success':(
      <TableComponent 
        setSortMode={setSortMode} 
        sortMode={sortMode} 
        textFilter={textFilter}
        currentDataId={currentDataId}
        setCurrentDataId={setCurrentDataId}
      />),
  }

  
  return (
    <div className="App">
      <Container>
        <OptionsBar setTextFilter={setTextFilter}/>
        <AddDataForm />
        {contentByStatus[dataStatus.status]}
        {currentDataId?(<DetailData currentDataId={currentDataId} />):(<p>Для отображения детальных записей, выделите строку</p>)}
      </Container>
   </div>
  );
}

export default App;
