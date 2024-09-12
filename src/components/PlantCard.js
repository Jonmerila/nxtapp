"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import useSWR, { mutate } from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Error: Network res !ok");
    }
    return res.json();
  });

function PlantCard({ plant, setPlantToEdit }) {
  const auth = useAuth();

  const { data, error } = useSWR("/api/plants", fetcher);

  if (error) return <div>Error loading plants</div>;
  if (!data) return <div>Loading...</div>;

  async function handleDelete(id) {
    if (!auth.token) {
      alert("You need to be logged in to delete items");
      return;
    }

    const response = await fetch(`/api/plants/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (!response.ok) {
      const msg = await response.json();
      return msg;
    }
    mutate("/api/plants");
    return;
  }

  return (
    <div className="plant-card p-2 bg-white rounded flex gap-8 items-center w-[1278px]">
      <div className="plant-card__name w-1/4 flex justify-center">
        {plant.name}
      </div>
      <p className="plant-card__detail flex justify-center w-1/2 gap-8">
        <span className="plant-card__label flex items-center">
          Description:
        </span>
        <span className="w-1/2">{plant.description}</span>
      </p>
      <p className="plant-card__detail">
        <span className="plant-card__label">Quantity:</span>{" "}
        <strong>{plant.quantity}</strong>
      </p>
      <p className="plant-card__detail">
        <span className="plant-card__label">Category:</span> {plant.category}
      </p>

      {auth.token && (
        <>
          <button
            className="ml-auto m-6 bg-blue-600 text-white p-2 rounded"
            type="button"
            onClick={() => setPlantToEdit(plant)}
          >
            Edit
          </button>
          <button
            className="ml-auto m-6 bg-red-600 text-white p-2 rounded"
            type="button"
            onClick={() => handleDelete(plant.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default PlantCard;
