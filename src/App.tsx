import './App.css';
import { Alert, ConfigProvider, Divider } from 'antd';
import useGetTodoItems from './utils/hooks/useGetTodoItems';
import { useAppSelector } from './utils/hooks/useRedux';
import Loader from './components/shared/loader/loader';
import TodoItemComponent from './components/todoItem/todoItemComponent';
import Header from './components/header/header';
import ButtonComponent from './components/shared/button/buttonComponent';
import ModalComponent from './components/shared/modal/modalComponent';
import { useRef, useState } from 'react';
import TodoItem from './constants/todoItem';
import FilterString from './constants/filterString';

function App() {
  const filter=useAppSelector(state=>state.filter.filter);
  const {error, load, items}=useGetTodoItems(filter);
  const defaultItems = useRef<TodoItem[]>(items);
  const defaultFilter = useRef<FilterString>(filter);
  if (load === false) {
    defaultItems.current = items;
  } else if (load === true) {
    if (
      defaultFilter.current.from !== filter.from ||
      defaultFilter.current.status !== filter.status ||
      defaultFilter.current.to !== filter.to
    ) {
      defaultItems.current = [];
      defaultFilter.current = filter;
    }
  }

  const [isOpenedModal, setIsOpenedModal]=useState<boolean>(false);
  
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#722ed1",
        fontFamily: "Montserrat"
      }
    }}>
      <Header></Header>
      <Divider>Todo List</Divider>
      <ButtonComponent text={'Add New TodoItem'} onClick={() => setIsOpenedModal(true)} type={'filled'}></ButtonComponent>
      <ModalComponent item={undefined} isOpened={isOpenedModal} setIsOpened={setIsOpenedModal}></ModalComponent>
      {
        load&&(<Loader></Loader>)
      }
      {
        defaultItems&&(
          <>
          {
            defaultItems.current.map(el=><TodoItemComponent item={el} key={el.id}/>)
          }
          </>
        )
      }
      {
        error&&(<Alert type='error' message={error}></Alert>)
      }
    </ConfigProvider>
  );
}

export default App;
