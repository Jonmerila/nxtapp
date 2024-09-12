"use client";

import { useAuth } from "@/context/auth";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
function PlantForm({ plantToEdit, setPlantToEdit }) {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (plantToEdit) {
      setName(plantToEdit.name);
      setDescription(plantToEdit.description);
      setQuantity(plantToEdit.quantity);
      setCategory(plantToEdit.category);
    } else {
      setName("");
      setDescription("");
      setQuantity("");
      setCategory("");
    }
  }, [plantToEdit]);

  async function handleSubmit(e) {
    if (!auth.token) {
      alert("You need to be logged in to Edit items");
      return;
    }
    e.preventDefault(); // Prevent the page from refreshing
    setError(""); // Clear previous errors

    const method = plantToEdit ? "PUT" : "POST";
    const url = plantToEdit ? `/api/plants/${plantToEdit.id}` : "/api/plants";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        name,
        description,
        quantity,
        category,
      }),
    });
    console.log("QUANTITY", quantity);

    // Handle res
    if (!response.ok) {
      const msg = await response.json();
      console.log(msg);
      setError(msg);
      return;
    }

    setName("");
    setDescription("");
    setQuantity("");
    setCategory("");
    mutate("/api/plants"); // Refresh Data
    setPlantToEdit(null);

    mutate(url);
  }

  // If the user is not logged in, show a message to log in
  if (!auth.token) {
    return <div>Please log in to create a new plant.</div>;
  }

  return (
    <div className="font-bold min-w-max flex items-center flex-col gap-4">
      <h1 className="bg-white p-2 rounded">
        {plantToEdit ? "Edit Plant" : "Create a new plant"}
      </h1>
      <form
        className="flex flex-col items-center gap-6 p-6 text-black text-lg form bg-white h-full w-full rounded"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="w-1/3 text-right">Name</label>
            <input
              className="flex-1 border-[1px] border-black p-1 rounded-sm"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {error?.message?.name && (
            <p className="text-red-500 text-sm self-center">
              {error.message.name}
            </p>
          )}
          <div className="flex items-center gap-4">
            <label className="w-1/3 text-right">Description</label>
            <input
              className="flex-1 border-[1px] border-black p-1 rounded-sm"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error?.message?.description && (
            <p className="text-red-500 text-sm self-center">
              {error.message.description}
            </p>
          )}
          <div className="flex items-center gap-4">
            <label className="w-1/3 text-right">Quantity</label>
            <input
              className="flex-1 border-[1px] border-black p-1 rounded-sm"
              type="number"
              value={quantity}
              min="0"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          {error?.message?.quantity && (
            <p className="text-red-500 text-sm self-center">
              {error.message.quantity}
            </p>
          )}
          <div className="flex items-center gap-4">
            <label className="w-1/3 text-right">Category:</label>
            <select
              className="flex-1 border-[1px] border-black p-1 rounded-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Tree">Tree</option>
              <option value="Flower">Flower</option>
              <option value="Herb">Herb</option>
              <option value="Grass">Grass</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-green-500 hover:bg-blue-600 px-4 py-2 rounded mt-4"
        >
          {plantToEdit ? "Update Plant" : "Add new Plant"}
        </button>
      </form>
    </div>
  );
}

export default PlantForm;
