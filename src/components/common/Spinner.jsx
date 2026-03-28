const Spinner = ({ size = "md", fullScreen = false, text = "Loading..." }) => {
  const sizeClasses = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
    xl: "loading-xl",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <span
        className={`loading loading-spinner text-primary ${sizeClasses[size]}`}
      ></span>
      {text && <p className="text-sm text-base-content/70">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Spinner;