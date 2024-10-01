import { useRef, useState } from 'react';
import FormEmailNumber from './components/forms/FormEmailNumber';
import ModelsEmailNumber from './models/forms/ModelsEmailNumber';

import loader from "./assets/loaders/fade-stagger-squares.svg";

import cls from "./App.module.css";


type TResponce = (
  {
    status: "ok" | "not found",
  } | {
    status: "error",
    decription: string
  }
);

function App() {
  const model = new ModelsEmailNumber();
  const [isLoading, setStateLoading] = useState(false);
  const [isError, setStateError] = useState(false);

  // Объект контролирующий повторные запросы
  let abortController = useRef(new AbortController());

  // Обработчик отправки формы
  const handleSubmit = async (body: ModelsEmailNumber)=> {
    // Обозначаем начало загрузки, а так же отсутсвие ошибок
    setStateLoading(true);
    setStateError(false);

    let isAbort = false;

    // Если AbortController проинициализирован или не прерван
    if (abortController.current) {
      // Прерываем предыдуший запрос
      abortController.current.abort();
      isAbort = true;
    }
  
    // Инициализируем новый контроллер перезапросов
    abortController.current = new AbortController();
  
    fetch("/api/find", {
      signal: abortController.current.signal,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      // Если ответ пришел с ошибокой, тогда бросаем исключение
      if(!(response.ok || ( 200 <= response.status && response.status < 400))){
        throw new Error("error in fetch to '/api/find'");
      }
      // Иначе возвращаем результат в формате json
      return response.json();
    }).then((data: TResponce) => {

      // Обозначаем конец загрузки
      setStateLoading(false);

      // Если пришла ошибка с сервера
      if(data.status === "error") {
        // Обозначаем наличие ошибки
        setStateError(true);
        // Выводим описание ошибки пользователю
        alert(data.decription);
        
      }else {

        // Если пришло состояние OK
        if(data.status === "ok") {
          alert("successful");
          
        } 
        // Если не найден пользователь
        else if(data.status === "not found") {
          alert("not found");
        }

      }
    }).catch(error => {
      // Если произошла ошибка не связаная с перезапросом
      if(!isAbort) {
        console.log(error);
        // Обозначаем наличие ошибки
        setStateError(true);
        // Обозначаем конец загрузки
        setStateLoading(false);
      }
    });
  }

  return (
    <div className={cls.conteinerApp}>
      <FormEmailNumber
        model={model}
        onSubmit={handleSubmit}
      />
      {
        isError ? <h1>Ошибка</h1> : isLoading && <img width="200" height="50" src={loader}/>
      }
    </div>
  )
}

export default App
