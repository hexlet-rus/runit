import { SNIPPET_NAME_MAX_LENGTH } from './validationSchemas';

const genDuplicateSnippetName = (fileName) => {
  const extensionIndex = fileName.lastIndexOf('.');
  const copyTextIndex = fileName.lastIndexOf('-copy');
  const dashIndex = fileName.lastIndexOf('_');
  const existCopyNumber = Number(fileName.slice(dashIndex + 1));

  let finalName = '';
  const extension = extensionIndex !== -1 ? fileName.slice(extensionIndex) : '';
  const conditionalFileName =
    extensionIndex !== -1 ? fileName.slice(0, extensionIndex) : fileName;
  const isAlreadyCopy = copyTextIndex !== -1;
  const increaseCopy = `${fileName.slice(0, dashIndex)}_${existCopyNumber + 1}`;

  if (isAlreadyCopy && dashIndex > copyTextIndex) {
    finalName = `${increaseCopy}${extension}`;
  } else {
    finalName = `${conditionalFileName}_${1}${extension}`;
  }
  if (!isAlreadyCopy) finalName = `${conditionalFileName}-copy${extension}`;

  if (finalName.length >= SNIPPET_NAME_MAX_LENGTH) {
    return finalName.slice(finalName.length - SNIPPET_NAME_MAX_LENGTH);
  }

  return finalName;
};

export default genDuplicateSnippetName;
