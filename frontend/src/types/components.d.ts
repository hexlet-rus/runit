export type InitialFormStateType = {
  state: 'initial' | 'failed' | 'success';
  message: string;
}

export type ThemesType = {
  monospaceFontFamily: string;
  colors: {
    primary: string;
    light: {
      bg: string;
      color: string;
    };
    dark: {
      bg: string;
      color: string;
    };
  }
}

export type ColourThemeConfigType = {
  base: 'vs' | 'vs-dark';
  inherit: boolean;
  rules: [
    {
      background: string;
      token: string;
    }
  ]
  colors: {
    [key: `editor.${string}`]: `#${string}`
  }
}