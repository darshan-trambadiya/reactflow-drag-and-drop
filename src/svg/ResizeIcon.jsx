function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#008ccd"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <line x1="6" y1="18" x2="18" y2="6" />
      <line x1="10" y1="18" x2="18" y2="10" />
      <line x1="14" y1="18" x2="18" y2="14" />
    </svg>
  );
}

export default ResizeIcon;
