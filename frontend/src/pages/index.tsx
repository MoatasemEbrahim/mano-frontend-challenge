import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-sm text-gray-600 text-center">
      <div className="space-y-4">
        <h4 className="text-4xl">Welcome to Mano health</h4>
        <div className="flex flex-col justify-center gap-2 flex-wrap w-full">
          <Link to="/manage-claims" className="text-lg underline">Manage Claims</Link>
          <Link to="/list-mrf-files" className="text-lg underline">List MRf Files</Link>
        </div>
      </div>
    </div>
  );
}
