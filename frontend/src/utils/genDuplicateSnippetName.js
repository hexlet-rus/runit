import { SNIPPET_NAME_MAX_LENGTH } from './validationSchemas';

const genDuplicateSnippetName = (fileName) => {
  const extensionIndex = fileName.lastIndexOf('.');
  const copyTextIndex = fileName.lastIndexOf('-copy');
  const dashIndex = fileName.lastIndexOf('_');
  const existCopyNumber = Number(fileName.slice(dashIndex + 1));
  console.log(copyTextIndex, dashIndex, existCopyNumber, extensionIndex);

  let finalName = '';
  const extension = extensionIndex !== -1 ? fileName.slice(extensionIndex) : '';

  if (copyTextIndex !== -1) {
    if (dashIndex > copyTextIndex) {
      finalName = `${fileName.slice(0, dashIndex)}_${
        existCopyNumber + 1
      }${extension}`;
    } else if (extensionIndex !== -1) {
      finalName = `${fileName.slice(0, extensionIndex)}_${1}${extension}`;
    } else {
      finalName = `${fileName}_${1}${extension}`;
    }
  } else finalName = `${fileName}-copy${extension}`;

  if (finalName.length >= SNIPPET_NAME_MAX_LENGTH) {
    return finalName.slice(finalName.length - SNIPPET_NAME_MAX_LENGTH);
  }

  return finalName;
};

export default genDuplicateSnippetName;
