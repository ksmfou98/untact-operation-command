import { Dispatch, SetStateAction, useCallback, useState } from "react";

type OnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
type ReturnTypes<T = any> = [T, OnChange, Dispatch<SetStateAction<T>>];

export default function useInput<T = any>(initialValue: T): ReturnTypes {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChange, setValue];
}
