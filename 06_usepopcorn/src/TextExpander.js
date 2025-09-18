import { useState } from "react";
//
// export default function TextExpander() {
//   return (
//     <>
//     </>
//   );
// }
//
export default function TextExpander({
  collapsedNumWords = 25,
  expandButtonText = "Show more...",
  collapseButtonText = "Show less...",
  buttonColor = "blue",
  className,
  exapanded = false,
  children = "",
}) {
  const [isExpanded, setIsExpanded] = useState(exapanded);

  if (children.length < 50) {
    return <div className={className}>{children}</div>;
  }

  const displayText = isExpanded
    ? children
    : // : children.slice(0, collapsedNumWords);
      children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  function handleShowText() {
    setIsExpanded((state) => !state);
  }

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>{displayText}</span>
      <button onClick={handleShowText} style={buttonStyle}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
