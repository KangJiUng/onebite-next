import ClientComponent from "../../component/client-component";
import ServerComponent from "../../component/server-component";

export default function Home() {
  return (
    <div>
      인덱스페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
