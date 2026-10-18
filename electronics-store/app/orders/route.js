import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getDishes } from "../menu/data";

const OrderSchema = z.object({
  items: z.array(z.object({
    id: z.string().min(1),
    quantity: z.number().int().min(1).max(20),
  })).min(1),
});

export async function POST(request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("session")) {
    return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Order items are invalid." }, { status: 400 });
  }

  const dishes = await getDishes();
  const lines = [];
  for (const item of parsed.data.items) {
    const dish = dishes.find((entry) => entry.id === item.id);
    if (!dish) {
      return NextResponse.json({ error: `Unknown dish: ${item.id}` }, { status: 400 });
    }
    lines.push({ id: dish.id, name: dish.name, quantity: item.quantity, unitPrice: dish.price });
  }

  const total = lines.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  return NextResponse.json({
    message: "Order validated. This course project does not save orders or take payment.",
    items: lines,
    total,
  }, { status: 201 });
}
