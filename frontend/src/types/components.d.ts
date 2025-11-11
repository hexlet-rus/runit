import React from 'react';
import { EditorStateType } from './slices';

export type TypeInitialFormState = {
  state: 'initial' | 'failed' | 'success';
  message: string;
};

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
  };
};

export type ColourThemeConfigType = {
  base: 'vs' | 'vs-dark';
  inherit: boolean;
  rules: [
    {
      background: string;
      token: string;
    },
  ];
  colors: {
    [key: `editor.${string}`]: `#${string}`;
  };
};

export type CardsType = {
  id: number;
  image: string;
  text: string;
};

export interface IAvatar {
  username: string;
}

export interface IHTMLPreview {
  code: string;
}

export interface IFileToolbar {
  snippet: Partial<EditorStateType>;
}

export type CommunityType = {
  badge: string
  title: string
  text: string
  btn: string
  link: string
}
interface TechnologySection {
  typeTechnology: string;
  listNamesTechnology: string[];
}

export interface TechnologyCategories {
  technologies: Technology[];
}
export interface TechnologyCategory{
  category: string;
  items: string[];
}

