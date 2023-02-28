import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import CreateCategory from './components/CreateCategoriy';
import CreateToDo from './components/CreateToDo';
import ToDo from './components/ToDo';
import {
  Categories,
  categoryState,
  customCategoryState,
  toDoSelector,
} from './recoil/atoms';

export default function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  const [category, setCategory] = useRecoilState(categoryState);

  const customCategories = useRecoilValue(customCategoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategories?.map((customCategory) => (
          <option value={customCategory.text} key={customCategory.id}>
            {customCategory.text}
          </option>
        ))}
      </select>
      <CreateToDo />
      <CreateCategory />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
