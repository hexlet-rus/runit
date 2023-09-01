import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import useResizeObserver from 'use-resize-observer';
import { useTernaryDarkMode } from 'usehooks-ts';

import { useTerminal } from './hooks.js';
import theme from '../../utils/theme.js';

import 'xterm/css/xterm.css';

const xTermThemes = {
  dark: {
    foreground: `#${theme.colors.dark.color}`,
    background: `#${theme.colors.dark.bg}00`,
    selectionBackground: `#${theme.colors.primary}60`,
  },
  light: {
    foreground: `#${theme.colors.light.color}`,
    background: `#${theme.colors.light.bg}00`,
    selectionBackground: `#${theme.colors.primary}60`,
  },
};

const runTerminal = (xTerm, { terminal, alertLogs }) => {
  xTerm.reset();
  xTerm.write(terminal.join('\n'));
  // eslint-disable-next-line no-alert
  alertLogs.forEach((alertLog) => window.alert(alertLog));
};

function Terminal() {
  const containerRef = useRef();
  const { isDarkMode } = useTernaryDarkMode();
  const { width, height } = useResizeObserver({ ref: containerRef });

  const xTermTheme = isDarkMode ? xTermThemes.dark : xTermThemes.light;

  const xTermRef = useRef(
    new XTerm({
      convertEol: true,
      allowTransparency: true,
      fontFamily: theme.monospaceFontFamily,
      fontSize: 12,
      lineHeight: 1.286,
      theme: xTermTheme,
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
    xTerm.options.theme = xTermTheme;
  }, [xTerm.options, xTermTheme]);

  useEffect(() => {
    runTerminal(xTerm, output);
  }, [output, xTerm]);

  useEffect(() => {
    fitAddon.fit();
  }, [fitAddon, width, height]);

  return (
    <div
      ref={containerRef}
      className="h-100 overflow-hidden"
      style={{ width: 'calc(100% + 1px)' }}
    />
  );
}

export default Terminal;
