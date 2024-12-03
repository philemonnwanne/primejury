const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M16 2.66669L4 8.00002V14.6667C4 20.9867 9.11333 26.9067 16 28C22.8867 26.9067 28 20.9867 28 14.6667V8.00002L16 2.66669ZM16 15.9867H25.3333C24.4667 20.7067 20.7467 24.9067 16 25.9067V16H6.66667V9.08002L16 4.93335V15.9867Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
        legal
      </span>
    </div>
  );
};

export default Logo;