import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { customCategoryState } from '../recoil/atoms';

interface IForm {
  customCategory: string;
}

export default function CreateCategory() {
  const setCustomCategory = useSetRecoilState(customCategoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ customCategory }: IForm) => {
    setCustomCategory((oldCustomCategories) => [
      { text: customCategory, id: Date.now() },
      ...oldCustomCategories,
    ]);
    setValue('customCategory', '');
  };

  return (
    <CreateCategoryForm onSubmit={handleSubmit(handleValid)}>
      <CreateCategoryInput
        {...register('customCategory', {
          required: 'Please write a category',
        })}
        placeholder='Write a category'
      />
      <AddBtn>Add</AddBtn>
    </CreateCategoryForm>
  );
}

const CreateCategoryForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const CreateCategoryInput = styled.input`
  width: 100%;
  margin-right: 10px;
`;

const AddBtn = styled.button`
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #8843dd;
  }
`;
