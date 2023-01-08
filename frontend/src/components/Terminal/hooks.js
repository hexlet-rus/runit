import { useSelector } from 'react-redux';

export const useTerminal = () => {
  const { output } = useSelector(({ terminal }) => ({
    output: terminal.output,
  }));
  return {
    output,
  };
};
