import { Link } from "alepha/react/router";

export interface HomeProps {
  appName: string;
  serverTime: string;
}

const Home = (_props: HomeProps) => {
  return (
    <div className="flex gap-4 p-6">
      <Link href="/hello">Go to Hello</Link>
      <Link href="/posts">Go to Posts</Link>
    </div>
  );
};

export default Home;
