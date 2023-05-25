import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Todo {
  description: string;
}
export interface withid extends Todo {
  todo_id: string;
}

interface Todos {
  todos: withid[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: Todos = {
  todos: [],
  isLoading: false,
  isError: false,
};

export const fetchTodos = createAsyncThunk("fetchall", async () => {
  const response = await fetch("http://localhost:5000/todos", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = response.json();
  return data;
});

export const postTodo = createAsyncThunk(
  "postTodo",
  async ({ description }: Todo) => {
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        description,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });
    builders.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builders.addCase(fetchTodos.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builders.addCase(postTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
  },
});

export default todoSlice.reducer;
