"use client";
import { useState } from "react";
import useSWR from "swr";
import PlantCard from "./PlantCard";
import PlantForm from "./PlantForm";
import PlantFilter from "./PlantFilter";

const fetcher = (url) => fetch(url).then((res) => res.json());

function PlantList() {
  const [plantToEdit, setPlantToEdit] = useState(null);
  const [filters, setFilters] = useState({ category: "", inStock: false });
  const { data: plants, error } = useSWR("/api/plants", fetcher);

  if (error) return <div>Error loading plants</div>;
  if (!plants) return <div>Loading...</div>;
  let filteredPlants;
  console.log("PLANTS", plants.message);
  if (!plants.message) {
    filteredPlants = plants.filter((plant) => {
      return (
        (filters.category === "" || plant.category === filters.category) &&
        (!filters.inStock || plant.quantity > 0)
      );
    });
  }
  console.log("FILT PLANTS", filteredPlants);
  return (
    <div className="flex justify-center flex-col items-center">
      <PlantFilter onFilterChange={(newFilters) => setFilters(newFilters)} />

      <div className="plant-list flex flex-col gap-3 mt-5 mb-5">
        {filteredPlants === undefined ? (
          <p className="text-black-500 text-lg">{plants.message}</p>
        ) : (
          filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              setPlantToEdit={setPlantToEdit}
              onDelete={() => handleDelete(plant.id)}
            />
          ))
        )}
      </div>
      <PlantForm plantToEdit={plantToEdit} setPlantToEdit={setPlantToEdit} />
    </div>
  );
}

export default PlantList;
