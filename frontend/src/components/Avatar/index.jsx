function Avatar({ username }) {
  return (
    <div className="rounded-circle overflow-hidden h-100">
      <svg
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <circle cx="16" cy="16" id="circle-clip" r="16" />
        </defs>
        <title>{username}</title>
        <rect
          fill="var(--bs-gray-500)"
          height="100%"
          mask="url(#circle-clip)"
          width="100%"
        />
        <text
          dy=".3em"
          fill="var(--bs-gray-400)"
          mask="url(#circle-clip)"
          style={{
            fontSize: '20px',
            fontWeight: 300,
            // letterSpacing: '-2px',
            pointerEvents: 'none',
          }}
          x="50%"
          y="52%"
          textAnchor="middle"
        >
          {username}
        </text>
      </svg>
    </div>
  );
}

export default Avatar;
