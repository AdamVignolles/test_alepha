import { GettingStarted } from "alepha/react/intro";
import { Link } from "alepha/react/router";

export interface HomeProps {
  appName: string;
  serverTime: string;
}

const Home = (props: HomeProps) => {
  return (
    <>
      <a href="/hello">Go to Hello</a>
    </>

  );
};

export default Home;
