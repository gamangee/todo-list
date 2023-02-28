import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  Categories,
  customCategoryState,
  IToDo,
  toDoState,
} from '../recoil/atoms';

export default function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as Categories };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const handleDelete = () => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <Container>
      <Text>{text}</Text>
      {category !== Categories.DOING && (
        <Tag name={Categories.DOING} onClick={onClick}>
          Doing
        </Tag>
      )}
      {category !== Categories.TO_DO && (
        <Tag name={Categories.TO_DO} onClick={onClick}>
          To Do
        </Tag>
      )}
      {category !== Categories.DONE && (
        <Tag name={Categories.DONE} onClick={onClick}>
          Done
        </Tag>
      )}
      {customCategories?.map(
        (customCategory) =>
          category !== customCategory.text && (
            <Tag
              key={customCategory.id}
              name={customCategory.text}
              onClick={onClick}
            >
              {customCategory.text}
            </Tag>
          )
      )}
      <DeleteBtn onClick={handleDelete}>delete</DeleteBtn>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const Text = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Tag = styled.button`
  margin: 5px;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.tagColor};
  color: #4a2972;
  font-size: 10px;
  font-weight: 600;
`;

const DeleteBtn = styled.button`
  background-color: #ff5252;
`;
