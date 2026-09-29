import { Link } from "alepha/react/router";

const NavBar = () => {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4">
        <span className="font-bold text-lg">Alepha Demo</span>
        <Link href="/" className="text-gray-600 hover:text-black">
          Home
        </Link>
        <Link href="/hello" className="text-gray-600 hover:text-black">
          Hello
        </Link>
        <Link href="/posts" className="text-gray-600 hover:text-black">
          Posts
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
