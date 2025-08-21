/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { ReactElement, useState } from 'react';
import { DocumentImage } from './DocumentImage';

export function Directory({
  type,
  name,
  documentChildren,
  renderDocumentChildren,
}) {
  const [isShow, setIsShow] = useState(false);

  const showDocumentHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsShow((prevState) => !prevState);
  };

  return (
    <div className="d-flex flex-wrap w-100 user-select-none">
      <div
        className="list-group-item list-group-item-action flex-grow-1"
        onClick={(e) => showDocumentHandler(e)}
      >
        <DocumentImage isShow={isShow} type={type} />
        <span className="ps-2">{name}</span>
      </div>
      <div className="d-flex flex-grow-1">
        <div className="d-inline-block px-2" />
        <div className="w-100">
          {isShow &&
            documentChildren.map((child: ReactElement) => renderDocumentChildren(child))}
        </div>
      </div>
    </div>
  );
}
