const ButtonLoader = ({ text = "Processing..." }) => {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="loading loading-spinner loading-sm"></span>
      <span>{text}</span>
    </span>
  );
};

export default ButtonLoader;