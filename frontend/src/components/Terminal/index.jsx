/* eslint-disable react/function-component-definition */
import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import useResizeObserver from 'use-resize-observer';

import { useTerminal } from './hooks.js';

import 'xterm/css/xterm.css';

const runTerminal = (xTerm, { terminal, alertLogs }) => {
  xTerm.reset();
  terminal.forEach((part) => xTerm.write(`\r\n ${part}`));
  // eslint-disable-next-line no-alert
  alertLogs.forEach((alertLog) => window.alert(alertLog));
};

function Terminal() {
  const containerRef = useRef();
  const { width, height } = useResizeObserver({ ref: containerRef });

  const xTermRef = useRef(
    new XTerm({
      convertEol: true,
      cursorBlink: true,
      cursorStyle: 'block',
    }),
  );
  const xTerm = xTermRef.current;

  const fitAddonRef = useRef(new FitAddon());
  const fitAddon = fitAddonRef.current;

  const { output } = useTerminal();

  useEffect(() => {
    xTerm.loadAddon(fitAddon);
    xTerm.open(containerRef.current);
  }, [xTerm, fitAddon]);

  useEffect(() => {
    runTerminal(xTerm, output);
    // return () => xTermRef.current?.componentWillUnmount();
  }, [output]);

  useEffect(() => {
    fitAddon.fit();
  }, [fitAddon, width, height]);

  return <div className="w-100 h-100 overflow-hidden" ref={containerRef} />;
}

export default Terminal;
