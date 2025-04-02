type LoadingSpinnerProps = {
  message: string;
};

const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-red-500 border-t-black rounded-full animate-spin" />
      <span className="text-black font-semibold">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
