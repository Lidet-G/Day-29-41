import { NextResponse } from "next/server";
import { getOrder } from "@/lib/data";

export async function GET(_request, { params }) {
  const { id } = await params;
  const order = getOrder(id);

  if (!order) {
    return NextResponse.json(
      { message: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}