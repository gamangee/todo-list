import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
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
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('customCategory', {
          required: 'Please write a category',
        })}
        placeholder='Write a category'
      />
      <button>Add</button>
    </form>
  );
}
