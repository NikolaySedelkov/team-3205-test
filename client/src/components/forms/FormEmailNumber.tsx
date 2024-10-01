import type { ChangeEvent, FormEvent } from "react";

import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import type ModelsEmailNumber from "../../models/forms/ModelsEmailNumber";

import cls from "./FormEmailNumber.module.css";

type TPropsFormEmailNumber = {
    onSubmit: (model: ModelsEmailNumber) => void,
    model: ModelsEmailNumber,
};

// Паттерн для определения валидного значения числа
const patternNumber = /^(\d{1,}(-\d{2,})*-(\d{1,})?)|(\d{0,2})$/;

// Форма ввода числа, в формате XX-XX-XX.. и почты с валидацией
const FormEmailNumber = observer(({onSubmit, model}: TPropsFormEmailNumber)=>{

    // Обработчик отправки формы
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(toJS(model));
    }

    // Обработчик ввода числа
    const handleChangeNumber = (e:ChangeEvent<HTMLInputElement>) => {
        // Если текущее значении соответсвует паттерну числа
        if(patternNumber.test(e.target.value)) {
            // Удаляем все '-' из числа
            const number = e.target.value.replaceAll('-', '');
            // Устанавливаем новое значения числа
            model.setNumber(number);
        }
    }

    return (
        <form 
            className={cls.fromInputNumber}
            onSubmit={handleSubmit}
        >
            <caption>Форма</caption>
            <tbody>
                <tr className={cls.containerInput}>
                    <th className={cls.thLabel}>Email</th>
                    <td>
                        <input 
                            type="email"
                            onChange={e=>{model.setEmail(e.target.value)}}
                            value={model.email}
                            required
                        />
                    </td>
                </tr>
                <tr className={cls.containerInput}>
                    <th className={cls.thLabel}>Number</th>
                    <td>
                        <input
                            onChange={handleChangeNumber}
                            value={model.numberWithHyphen}
                            required
                        />
                    </td>
                </tr>
            </tbody>
            <button type="submit">Отправить</button>
        </form>
    )
});

export default FormEmailNumber;