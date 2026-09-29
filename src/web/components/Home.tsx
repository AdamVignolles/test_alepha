import { Link } from "alepha/react/router";

export interface HomeProps {
  appName: string;
  serverTime: string;
}

const Home = (_props: HomeProps) => {
  return (
    <>
      <Link href="/hello">Go to Hello</Link>
    </>
  );
};

export default Home;
