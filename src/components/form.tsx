/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";

// useForm functional component
type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function useForm<T extends Record<string, any>>(
    callback: (values: T) => Promise<any> | void, initialState: T)
    { 
        const [values, setValues] = useState<T>(initialState);
        const [isSubmitting, setIsSubmitting] = useState(false);
        // onChange
        const onChange = useCallback((event: React.ChangeEvent<FormElement>) => {
        const target = event.target;
        const { name } = target;

        if (!name) return; //safeguard

        let nextVlaue: any;
        if (target instanceof HTMLInputElement && target.type === "checkbox"){
            nextVlaue = target.checked;
        }else if (target instanceof HTMLInputElement && target.type === "file"){
            nextVlaue = target.files && target.files.length > 0 ? target.files[0] : null;
        }else if (target instanceof HTMLInputElement && target.type === "number"){
            const parsed = target.value.trim() === "" ? "": Number(target.value);
            nextVlaue = Number.isNaN(parsed) ? target.value : parsed;
        }else {
            nextVlaue = target.value;
        }

        setValues((prev: any) => ({ ...prev, [name]: nextVlaue}));
    }, []);


    // onSubmit
    const onSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            setIsSubmitting(true);
            await callback(values);
        } finally {
            setIsSubmitting(false);
        }
    },
        [callback, values]
    );

    const reset = useCallback(() => setValues(initialState), [initialState]);

    // return values
    return {
        setValues,
        onChange,
        onSubmit,
        values,
        isSubmitting,
        reset,
    };
}