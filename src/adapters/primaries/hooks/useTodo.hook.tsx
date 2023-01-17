import {useEffect, useState} from 'react';
import {useConfig} from '../../../core/context/ConfigurationContext';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import TodoEntity from '../../../domain/entities/todo.entities';

const useTodo = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoEntity[]>([]);
  const {listAllTodoUsecase, createTodoUsecase, markTodoDoneUsecase} =
    useConfig();

  const getAllTodos = async () => {
    if (!isLoading) {
      setLoading(true);
    }

    const response: UsecaseResponse<TodoEntity[]> =
      await listAllTodoUsecase.call();
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
    const response: UsecaseResponse<TodoEntity> = await createTodoUsecase.call({
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
