
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const Form = () => {

    interface IMyForm {
        name: string;
        age: number;
    }

    const [tasks, setTasks] = useState<IMyForm[]>([])

    const {
        register, 
        handleSubmit, 
        formState: {errors}, 
        reset 
    } = useForm<IMyForm>({
        mode: "onBlur", 
    })

    const saveElement: SubmitHandler<IMyForm> = data => {
            setTasks((prev) => [...prev, data])
            reset();
        }

    return (    
    <>
    <form onSubmit={handleSubmit(saveElement)}>
        <input 
            {...register('name', {
                    required: "*обязательно для заполнения",
                    minLength: {
                        value: 3,
                        message: "Вы уверены?"
                    }
                }
        )}
        />
        <div>{errors.name?.message}</div>
        <input 
            {...register('age', {
                    required: "*обязательно для заполнения",
                    minLength: {
                        value: 10,
                        message: "Введите возраст формата 00.00.0000"
                    }
                }
            )}
        />
        <div>{errors.age?.message}</div>
        <button type="submit">Сохранить</button>
    </form>

    {
    tasks.map((task) => 
        <p>
            {task.name} - {task.age}
        </p>
    )
    }
    </>
    )
}

export default Form;