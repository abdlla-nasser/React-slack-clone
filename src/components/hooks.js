import { useState } from 'react';

export const useInput = initValue => {
    const [ value, setValue ] = useState(initValue);
    return {
        value,
        reset: () => setValue(''),
        onChange: e => {
            setValue(e.target.value);
        }
    }
}