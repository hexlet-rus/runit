import type { IHTMLPreview } from 'src/types/components';

function HTMLPreview({ code }: IHTMLPreview) {
  return (
    <div className="h-100 w-100">
      <iframe className="h-100 w-100" srcDoc={code} title="render" />
    </div>
  );
}

export default HTMLPreview;
