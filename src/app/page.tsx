"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState<ItemModel[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    fetch("http://223.130.135.124:8080/api/items")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(Array.isArray(data) ? data : [data]);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* redirect button */}
      <button onClick={() => router.push('/item/register')} className="rounded-full bg-slate-300">add item</button>
      {/* show all */}
      <table>
        <thead>
          <tr className="border-2 border-indigo-600">
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="divide-y divide-slate-700">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
