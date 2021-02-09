import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    let { value } = e.target;
    if (value.type === `number`) {
      value = parseInt(value);
    }

    setValues({
      // copy the existing values into it
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return { values, updateValue };
}
