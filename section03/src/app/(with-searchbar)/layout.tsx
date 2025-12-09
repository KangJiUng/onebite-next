import Searchbar from "../../component/searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
