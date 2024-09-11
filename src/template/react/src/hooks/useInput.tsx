import { useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: Event) => {
    setValue((e.target as HTMLInputElement).value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
