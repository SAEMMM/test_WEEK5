import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  'todos/__addToDo',
  async (payload, thunkAPI) => {
    try {
      await waitTwoSeconds()
      const response = await axios.post('https://week5-test-api.onrender.com/todos', payload)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  'todos/__deleteToDo',
  async (payload, thunkAPI) => {
    try {
      await waitTwoSeconds()
      await axios.delete(`https://week5-test-api.onrender.com/todos/${payload}`)
      return payload
    } catch(error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return state.concat(action.payload)
    },
    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
    setTodos: (state, action) => {
      state.list = action.payload
    }
  },
});

export const { addTodo, deleteTodo, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
