interface Props {
  children: React.ReactNode;
  count?: number;
  className: string;
}

const Badge = ({ children, count, className }: Props) => {
  return (
    <div className={`relative ${className}`}>
      {count != 0 && (
        <div className="absolute rounded-full bg-red-600 -right-1.5 -top-1.5 text-white px-1 text-xs text-center">
          {count}
        </div>
      )}
      {children}
    </div>
  );
};

export default Badge;
