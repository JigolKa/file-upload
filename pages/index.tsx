import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div>
        <h1 className="text-4xl font-bold">Upload a file</h1>

        <form
          action="/api/new"
          method="POST"
          encType="multipart/form-data"
          className="mt-12"
        >
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="file">
              Add a file
            </label>
            <input type="file" name="file" id="file" required />
          </div>

          <button
            type="submit"
            className="px-4 mt-6 p-2 rounded shadow-md focus:ring focus:ring-blue-950 bg-blue-500 hover:bg-blue-600 transition text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
