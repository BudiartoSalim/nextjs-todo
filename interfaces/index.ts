export interface ITodo {
  id: number;
  title: string;
  description: string;
  status_description: string;
  status_id: number;
}

export interface ITodos {
  todos: ITodo[];
}

export interface INewTodo {
  title: string;
  description: string;
}