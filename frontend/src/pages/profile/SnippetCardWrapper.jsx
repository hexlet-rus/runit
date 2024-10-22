function SnippetCardWrapper({ children }) {
  const childrenProps = children.props.children;
  const hoverTooltip =
    childrenProps.length > 1 ? childrenProps[0].props.data?.name : '';
  return (
    <div className="snippet-card-wrapper" title={hoverTooltip}>
      {children}
    </div>
  );
}

export default SnippetCardWrapper;
