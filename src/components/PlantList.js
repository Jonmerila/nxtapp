"use client";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import PlantCard from "./PlantCard";
import PlantForm from "./PlantForm";
import PlantFilter from "./PlantFilter";

const fetcher = (url) => fetch(url).then((res) => res.json());

function PlantList() {
  const [plantToEdit, setPlantToEdit] = useState(null);
  const [filters, setFilters] = useState({ category: "", inStock: false });
  const [url, setUrl] = useState("/api/plants");
  let queryString;
  useEffect(() => {
    queryString = new URLSearchParams({
      category: filters.category || "",
      quantity: filters.inStock ? "1" : "",
    }).toString();

    console.log("QUERYSTRING", queryString);

    setUrl(`/api/plants?${queryString}`);
  }, [filters]);

  const { data: plants, error } = useSWR(url, fetcher);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (error) return <div>Error loading plants</div>;
  if (!plants) return <div>Loading...</div>;
  mutate(url);
  return (
    <div className="flex justify-center flex-col items-center">
      <PlantFilter onFilterChange={handleFilterChange} />

      <div className="plant-list flex flex-col gap-3 mt-5 mb-5">
        {plants.message ? (
          <p className="text-black-500 text-lg">{plants.message}</p>
        ) : (
          plants.map((plant) => (
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

//   if (!plants.message) {
//     filteredPlants = plants.filter((plant) => {
//       return (
//         (filters.category === "" || plant.category === filters.category) &&
//         (!filters.inStock || plant.quantity > 0)
//       );
//     });
//   }
