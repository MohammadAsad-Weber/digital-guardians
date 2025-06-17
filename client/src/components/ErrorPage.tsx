// Interface
interface ErrorPageProps {
  code?: number;
  status?: string;
  message?: string;
}
function ErrorPage({
  code = 500,
  status = "Internal server error",
  message = "An unknown error has occured",
}: ErrorPageProps) {
  return (
    <main className="min-h-screen w-full p-5 text-center text-red-600 flex flex-col items-center justify-center gap-2.5 bg-red-100">
      <h1 className="text-5xl font-bold">OOPS!</h1>
      <h2 className="text-xl font-medium">
        Error {code}: {status}
      </h2>
      <h3 className="text-xl font-medium">{message}</h3>
    </main>
  );
}

export default ErrorPage;
