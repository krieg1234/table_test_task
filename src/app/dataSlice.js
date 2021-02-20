import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const fetchData=createAsyncThunk('data/fetchedData', async (dataDisplayMode='small')=>{
  const dataUrls={ //url в записимости от displayMod
    big:'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
    small:'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
  }
  const responce=await fetch(dataUrls[dataDisplayMode]);
  const json=await responce.json();
  return json;
})



export const dataSlice=createSlice({
  name:'data',
  initialState:{
    dataById:{},
    allData:[],
    status:'idle',
    error:null,
    tableFieldsHeader:['id','firstName','lastName','email','phone'], //колонки для табилцы или формы новых данных

  },
  reducers:{
    addData:(state,{payload})=>{
      const newData={...payload, id:Number(payload.id)}; //с сервера получаем id в виде числа, приводим payload в соответствие
      return {
        ...state,
        allData:[...state.allData, newData.id],
        dataById:{...state.dataById, [newData.id]:{...newData}}
      };
    },
  },
  extraReducers:{ //редьюсеры для асинхронного запроса
[fetchData.pending]:(state)=>{
  state.status='loading';
},
[fetchData.rejected]:(state,{error})=>{
  state.status='failed';
  state.error=error.message;
},
[fetchData.fulfilled]:(state,{payload})=>{
  state.status='success';
  state.allData=payload.map(data=>data.id);
  state.dataById=payload.reduce((acc,data)=>({...acc,[data.id]:data}),{});
 
}
  }
});

export const {addData}=dataSlice.actions;
export const selectTableFields=(state)=>state.data.tableFieldsHeader; //возвращает заголоки таблицы


export default dataSlice.reducer;