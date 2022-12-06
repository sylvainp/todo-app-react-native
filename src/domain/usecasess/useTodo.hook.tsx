import {useEffect, useState} from 'react';
import {container} from 'tsyringe';
import UsecaseResponse from '../../core/usecase/usecase.response';
import TodoEntity from '../entities/todo.entities';
import CreateTodoUsecase from './createTodo/create_todo.usecase';
import ListAllTodoUsecase from './listAllTodo/list_all_todo.usecase';
import MarkTodoDoneUsecase from './markTodoDone/mark_todo_done.usecase';

const useTodo = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoEntity[]>([]);

  const getAllTodos = async () => {
    if (!isLoading) {
      setLoading(true);
    }
    const getAllTodoUsecase: ListAllTodoUsecase =
      container.resolve(ListAllTodoUsecase);
    const response: UsecaseResponse<TodoEntity[]> =
      await getAllTodoUsecase.call();
    if (response.data) {
      setTodos(response.data);
    } else {
      setTodos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const addTodo = async (title: string, description: string | null) => {
    setLoading(true);
    const addTodoUsecase: CreateTodoUsecase =
      container.resolve(CreateTodoUsecase);
    const response: UsecaseResponse<TodoEntity> = await addTodoUsecase.call({
      title,
      description,
    });

    if (response.data) {
      getAllTodos();
    } else {
      setLoading(false);
    }
  };

  const markTodoDone = async (todoId: string, done: boolean) => {
    setLoading(true);
    const markTodoDoneUsecase: MarkTodoDoneUsecase =
      container.resolve(MarkTodoDoneUsecase);
    const response: UsecaseResponse<TodoEntity> =
      await markTodoDoneUsecase.call({
        id: todoId,
        done,
      });
    if (response.data) {
      getAllTodos();
    } else {
      setLoading(false);
    }
  };

  return {todos, isLoading, addTodo, markTodoDone, getAllTodos};
};

export default useTodo;
