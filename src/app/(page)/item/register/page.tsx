"use client";
import { createItem } from "@/app/service/item/item.api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function itemRegister() {
  const [formData, setFormData] = useState<ItemModel>({
    name: "",
    quantity: 0,
  });
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createItem(formData);
    setFormData({ name: "", quantity: 0 });
    router.push('/')
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
      // 삼항 연산자: 만약 name 이 quantity 라면 10진수 정수로 변환, 아니면 그냥 입력값 사용
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={formData.name}
          placeholder="name"
          onChange={handleChange}
        ></input>
        <input
          name="quantity"
          value={formData.quantity}
          type="number"
          placeholder="quantity"
          onChange={handleChange}
        ></input>
        <button type={"submit"}>등록</button>
      </form>
    </div>
  );
}
