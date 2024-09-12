import PlantCard from "@/components/PlantCard";
import PlantForm from "@/components/PlantForm";
import PlantList from "@/components/PlantList";

const axios = require("axios").default;

export default async function Home() {
  let plants;
  try {
    const response = await axios.get("http://localhost:3000/api/plants/");
    plants = await response.data; // Axios automatically parses JSON
  } catch (error) {
    console.log("Failed to get plants", error);
  }

  return (
    <main className="flex min-h-screen flex-col bg-green-300 text-lg items-center justify-between text-black p-24">
      {/* <section className="flex flex-col items-center text-base justify-center text-black gap-2">
        {plants &&
          plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)}
      </section> */}
      <section>
        <PlantList />
      </section>
    </main>
  );
}
