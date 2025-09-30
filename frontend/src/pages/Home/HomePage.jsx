import { EventHeroList } from "../../components/Events/Events";

export default function HomePage() {
  return (
    <main className="pt-20 flex flex-col items-center justify-center bg-gray-100">
      <section className="flex flex-col w-full gap-4 px-12 py-8">
        <EventHeroList />
      </section>
    </main>
  );
}
