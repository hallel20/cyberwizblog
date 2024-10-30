const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col bg-white absolute top-14 px-8 py-3 right-1 z-10 rounded-lg shadow-md gap-1"
      style={{ maxWidth: "350px" }}
    >
      {children}
    </div>
  );
};

export default Modal;
