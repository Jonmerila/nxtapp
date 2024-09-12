// import { createContext, useContext, useState, useEffect } from "react";

// const PlantContext = createContext();

// export function PlantProvider({ children }) {
//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     async function fetchPlants() {
//       const response = await fetch("/api/plants");
//       const data = await response.json();
//       setPlants(data);
//     }

//     fetchPlants();
//   }, []);

//   return (
//     <PlantContext.Provider value={{ plants, setPlants }}>
//       {children}
//     </PlantContext.Provider>
//   );
// }

// export function usePlants() {
//   return useContext(PlantContext);
// }
