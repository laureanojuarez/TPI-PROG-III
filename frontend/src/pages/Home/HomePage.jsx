
import { EventHeroList } from "../../components/Events/Events";
import { Search } from "../../components/searchComponent/Search";
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 ">
      <section className="flex flex-col w-full  gap-4 px-4 py-2">
        <Search />
        <EventHeroList />
      </section>
    </main>
  );
}
