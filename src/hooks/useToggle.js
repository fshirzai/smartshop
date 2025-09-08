import { useState, useCallback } from 'react';

export const useToggle = (initial = false) => {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((prev) => !prev), []);
  const setOnTrue = useCallback(() => setOn(true), []);
  const setOnFalse = useCallback(() => setOn(false), []);
  return [on, { toggle, setOn, setOnTrue, setOnFalse }];
};
