import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { useButton } from './hooks';
import routes from '../../routes';

export const Button = memo(() => {
  const { onClick, disabled, update } = useButton();
  const [currentSnippetId, setCurrentSnippetId] = useState();

  useEffect(() => {
    const createSnippet = async () => {
      const response = await axios.post(routes.createSnippetPath(), {
        code: '',
      });
      setCurrentSnippetId(response.data.id);
    };
    createSnippet();
  }, []);

  return (
    <div className="text-center">
      <button
        type="button"
        className="btn btn-success btn-lg"
        disabled={disabled}
        onClick={() => {
          onClick();
          update(currentSnippetId);
        }}
      >
        Run
      </button>
    </div>
  );
});
