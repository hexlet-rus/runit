const setCopyWordCount = (fileName) => {
	const extensionIndex = fileName.lastIndexOf('.');

  let finalName = '';
	let copyWordsCount = 0;

  if (extensionIndex === -1) {
		const fileNameWords = [];
    for (const word of fileName.split('-')) {
			if (word === 'copy') {
				copyWordsCount += 1;
			} else {
				fileNameWords.push(word);
			}
		}
		finalName = fileNameWords.join('-');
		if (copyWordsCount > 1) {
			finalName = `${finalName}-copy(${copyWordsCount})`;
		} else if (copyWordsCount === 1) {
			finalName = `${finalName}-copy`;
		}
  } else {
    const [name, extension] = [
      fileName.slice(0, extensionIndex),
      fileName.slice(extensionIndex + 1),
    ];
		const fileNameWords = [];
    for (const word of name.split('-')) {
			if (word === 'copy') {
				copyWordsCount += 1;
			} else {
				fileNameWords.push(word);
			}
		}
		finalName = fileNameWords.join('-');
		if (copyWordsCount > 1) {
			finalName = `${finalName}-copy.${extension}(${copyWordsCount})`;
		} else if (copyWordsCount === 1) {
			finalName = `${finalName}-copy.${extension}`
		}
  }

  return finalName;
}

export default setCopyWordCount;