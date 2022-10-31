import React, { useEffect } from 'react';
import { MonacoEditor } from './Editor/index.jsx
import { Button } from './Button/index.jsx';
import { Terminal } from './Terminal/index.jsx';
import { actions } from './slices/index.js';
import { useDispatch } from 'react-redux';
import { useSnippets } from './../hooks';
