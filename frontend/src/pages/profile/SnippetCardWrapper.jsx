function SnippetCardWrapper({ children }) {
  const hoverTooltip =
    children.props.children.length > 1
      ? children.props.children[0].props.data?.name
      : '';
  return (
    <div className="snippet-card-wrapper" title={hoverTooltip}>
      {children}
    </div>
  );
}

export default SnippetCardWrapper;
