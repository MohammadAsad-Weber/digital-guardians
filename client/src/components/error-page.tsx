import { BaseResponse } from "@/types/response";

// Props type for the ErrorPage component
type ErrorPageProps = Partial<BaseResponse>;

function ErrorPage({
  status = "Internal server error",
  status_code = 500,
  message = "An unknown error has occured",
}: ErrorPageProps) {
  return (
    <main className="min-h-screen w-full p-5 text-center text-red-600 flex flex-col items-center justify-center gap-2.5 bg-red-100">
      
      {/* MAIN HEADING */}
      <h1 className="text-5xl font-bold">OOPS!</h1>

      {/* STATUS CODE & TEXT */}
      <h2 className="text-xl font-medium">
        Error {status_code}: {status}
      </h2>

      {/* MESSAGE */}
      <h3 className="text-xl font-medium">{message}</h3>

    </main>
  );
}

export default ErrorPage;
