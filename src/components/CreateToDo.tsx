import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from '../recoil/atoms';

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <CreateTodoForm onSubmit={handleSubmit(handleValid)}>
      <CreateTodoInput
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder='Write a to do'
      />
      <AddBtn>Add</AddBtn>
    </CreateTodoForm>
  );
}

const CreateTodoForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const CreateTodoInput = styled.input`
  width: 100%;
  margin-right: 10px;
`;

const AddBtn = styled.button`
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #8843dd;
  }
`;
