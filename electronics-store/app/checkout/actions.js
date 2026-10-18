"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const OrderSchema = z.object({
  items: z.array(z.object({
    id: z.string().min(1),
    quantity: z.number().int().min(1).max(20),
  })).min(1),
});

export async function placeOrder(_previousState, formData) {
  const cookieStore = await cookies();
  if (!cookieStore.get("session")) {
    return { success: false, message: "Please sign in before placing an order." };
  }

  let submitted;
  try {
    submitted = JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    return { success: false, message: "The order data is invalid." };
  }

  const parsed = OrderSchema.safeParse({ items: submitted });
  if (!parsed.success) {
    return { success: false, message: "Please check your cart and try again." };
  }

 
  return { success: true, message: "Order validated successfully. No payment was taken." };
}
