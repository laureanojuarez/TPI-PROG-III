import { EventSection } from "../../components/Events/EventSection";
import { Search } from "../../components/searchComponent/Search";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 w-full">
        <Search />
      </div>
      <EventSection />
    </div>
  );
}
