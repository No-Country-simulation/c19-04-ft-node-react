import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export const redirectLogin = (path, delay) => {

  const navidate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navidate(path)
    }, delay);

    return () => clearTimeout(timer);
  }, [navidate, path, delay]);
}