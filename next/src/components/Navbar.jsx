import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          MyApp
        </Link>
        <Link href="/protected" className="text-xl font-bold hover:text-gray-300">
          Protected
        </Link>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-sm font-medium hover:text-gray-300 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
