import { File } from './File';
import { Directory } from './Directory';

const Documents = ({ fileTreeData }) => {
  const normalizedData = Array.isArray(fileTreeData)
    ? fileTreeData
    : Array(fileTreeData);

  return normalizedData.map((file) => {
    if (file.type === 'file') {
      return <File key={file.name} name={file.name} type={file.type} />;
    }
    return (
      <Directory
        key={file.name}
        documentChildren={file.children}
        name={file.name}
        renderDocumentChildren={(child) => (
          <Documents key={child.name} fileTreeData={child} />
        )}
        type={file.type}
      />
    );
  });
};

export function FileTree({ fileTreeData }) {
  return (
    <div className="list-group w-100 px-2">
      <Documents fileTreeData={fileTreeData} />
    </div>
  );
}
