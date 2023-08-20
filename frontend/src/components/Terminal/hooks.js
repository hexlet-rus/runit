import { useSelector } from 'react-redux';

export const useTerminal = () => {
  const output = useSelector((state) => state.terminal.output);

  return {
    output,
  };
};
