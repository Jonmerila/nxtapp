import PlantCard from "@/components/PlantCard";
import Image from "next/image";
import AuthForm from "@/components/AuthForm";

export default function homePlant() {
  return (
    <main className="flex flex-col gap-8 h-[500px] bg-green-100 h-screen row-start-2 w-screen h-screen justify-center w-64 items-center sm:items-start">
      <AuthForm />
    </main>
  );
}
