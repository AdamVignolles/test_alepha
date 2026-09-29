import NavBar from "./NavBar.tsx";

export interface HomeProps {
  appName: string;
  serverTime: string;
}

const Home = ({ appName, serverTime }: HomeProps) => {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="font-bold text-2xl">{appName}</h1>
        <p className="mt-2 text-gray-500">Server time: {serverTime}</p>
      </div>
    </>
  );
};

export default Home;
