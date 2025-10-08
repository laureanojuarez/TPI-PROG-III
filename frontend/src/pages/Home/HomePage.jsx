import { EventHeroList } from "../../components/Events/Events";

export default function HomePage() {
  return (
    <main className=" flex flex-col items-center justify-center bg-gray-100 ">
      <div className="w-full h-56 bg-black ">
        <div className="pt-30 flex justify-center">
          <input type="text" className="bg-white w-64 px-4 py-2" />
        </div>
      </div>
      <section className="flex flex-col w-full  gap-4 px-4 py-2">
        <EventHeroList />
      </section>
    </main>
  );
}
