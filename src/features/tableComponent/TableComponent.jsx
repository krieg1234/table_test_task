import React from 'react';
import './style.css';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {selectTableFields} from '../../app/dataSlice'
import {sortBy} from 'lodash'
import { TablePagination } from '@material-ui/core';

export function TableComponent(props){
  
  const tableHeaders=useSelector(selectTableFields);
  const {
    sortMode, 
    textFilter, 
    setSortMode, 
    currentDataId, 
    setCurrentDataId,
  }=props;

  const tableData=useSelector((state)=>{
    const {allData,dataById}=state.data;
    //получаем данные в соответствии с заголовками табилцы
    const rawData= allData.map(dataId=>(
      tableHeaders.reduce((acc,header)=>{
        return {...acc,[header]:dataById[dataId][header]}
      },{})));

    //фильтруем
    const filtredData=rawData.filter(dataRow=>{
      return tableHeaders.reduce((acc,header)=>{
        if (acc) return true;
        return String(dataRow[header]).includes(textFilter);
      },false);
    });

    //сортируем
    
    if (!sortMode.field) return filtredData;
    const sortData=sortBy(filtredData,[
      (dataRow)=>(dataRow[sortMode.field])
    ]);
    return sortMode.isDirect? sortData:sortData.reverse();    
  });
  
  const headerClickHandler=(header)=>(e)=>{
    const newSortField=header;
    const newSortDirection=(newSortField===sortMode.field)?(!sortMode.isDirect):true;
    
    setSortMode({
      field:newSortField, 
      isDirect:newSortDirection
    });
  }
  //задаём классы для стилизации сортируемого столбца
  const buildHeaderClassName=(header)=>{
    const className=[];
    if (header===sortMode.field){
      className.push('sortField')
      if (sortMode.isDirect) className.push('direct');
      else className.push('reverse');
    }
    return className.join(' ');
  }

  //пегитация
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
  <div className='data-table'>
    <TablePagination
        component="div"
        count={tableData.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableHeaders   
            .map(header=>(
              <th 
                key={header}
                className={`${buildHeaderClassName(header)}`}
                onClick={headerClickHandler(header)}              
              >{header}</th>
            ))}
        </tr>        
      </thead>
      <tbody>
        {tableData.filter((_,index)=>{
              const isInRange=(index>=page*rowsPerPage) && (index<page*rowsPerPage+rowsPerPage)
              return (isInRange)
            })       
            .map((dataRow,indexRow)=>(
          <tr 
            style={dataRow.id===currentDataId?{fontWeight:'900'}:{}} 
            key={indexRow} 
            onClick={()=>setCurrentDataId(dataRow.id)
          }>
            {tableHeaders.map((header,index)=>(
              <td  key={header+index}>{dataRow[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      
    </Table>
    
  </div>
    
  )
}