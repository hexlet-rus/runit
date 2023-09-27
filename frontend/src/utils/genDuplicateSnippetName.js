import { SNIPPET_NAME_MAX_LENGTH } from './validationSchemas';

const genDuplicateSnippetName = (fileName) => {
  const extensionIndex = fileName.lastIndexOf('.');
  const [name, extension] = [
    fileName.slice(0, extensionIndex),
    fileName.slice(extensionIndex + 1),
  ];

  const finalName = `${name}-copy.${extension}`;

  if (finalName.length >= SNIPPET_NAME_MAX_LENGTH) {
    return finalName.slice(finalName.length - SNIPPET_NAME_MAX_LENGTH);
  }

  return finalName;
};

export default genDuplicateSnippetName;
