import React from 'react';
import { DocumentImage } from './DocumentImage';

export function File({ type, name }) {
  return (
    <div className="d-flex flex-wrap w-100 user-select-none">
      <div className="list-group-item list-group-item-action flex-grow-1">
        <DocumentImage type={type} />
        <span className="ps-2">{name}</span>
      </div>
    </div>
  );
}
