import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CreateCategory from './components/CreateCategory';
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
    setCategory(event.currentTarget.value as Categories);
  };

  return (
    <Container>
      <Title>TO DO LIST</Title>
      <Contents>
        <Select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {customCategories?.map((customCategory) => (
            <option value={customCategory.text} key={customCategory.id}>
              {customCategory.text}
            </option>
          ))}
        </Select>
        <CreateCategory />
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 20px 0;
  width: 50vw;
  min-width: 300px;
  margin: 0 auto;
`;

const Title = styled.h1`
  background-color: ${(props) => props.theme.mainColor};
  padding: 15px 0;
  margin-bottom: 15px;
  color: #ffffff;
  font-weight: 800;
  -webkit-box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`;

const Contents = styled.div`
  background-color: #ffffff;
  padding: 20px;
`;
