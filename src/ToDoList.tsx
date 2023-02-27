import React from 'react';
import { atom, useRecoilValue } from 'recoil';
import CreateToDo from './components/CreateToDo';
import ToDo from './components/ToDo';
import { IToDo } from './recoil/atoms';

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export default function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
