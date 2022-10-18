/* eslint-disable react/function-component-definition */
import React, { useEffect, useRef } from 'react';
import { XTerm } from 'xterm-for-react';
import 'xterm/css/xterm.css';

import { useTerminal } from './hooks.js';

const runTerminal = (xterm, { terminal, alertLogs }) => {
  const term = xterm.terminal;
  term.reset();
  terminal.forEach((part) => term.write(`\r\n ${part}`));
  // eslint-disable-next-line no-alert
  alertLogs.forEach((alertLog) => window.alert(alertLog));
};

export const Terminal = () => {
  const xTermRef = useRef(null);
  const { output } = useTerminal();

  useEffect(() => {
    runTerminal(xTermRef.current, output);
    // return () => xTermRef.current?.componentWillUnmount();
  }, [output]);

  return (
    <div className="terminal-container" style={{ overflow: 'auto' }}>
      <XTerm ref={xTermRef} className={"xterm"} />
    </div>
  );
};
