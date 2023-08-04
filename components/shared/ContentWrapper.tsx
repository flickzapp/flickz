export default function ContentWrapper({ children }: any) {
  return (
    <div className="min-h-screen flex flex-col p-8 md:px-12 gap-6 justify-center items-center">
      {children}
    </div>
  );
}
