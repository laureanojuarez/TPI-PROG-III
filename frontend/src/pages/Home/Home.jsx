import { EventHeroList } from "../../components/Events/Events";
import { Search } from "../../components/searchComponent/Search";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 ">
      <Search />
      <section className="flex flex-col w-full  gap-4 px-4 py-2">
        <EventHeroList />
      </section>
    </div>
  );
}
