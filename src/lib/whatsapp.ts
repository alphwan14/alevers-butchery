export type OrderPayload = {
  meat: string;
  qty: string;
  name: string;
  phone: string;
  delivery: string;
};

export function buildWhatsAppOrderMessage(payload: OrderPayload): string {
  const { meat, qty, name, phone, delivery } = payload;
  const trimmed = (v: string) => v.trim();
  const lines: string[] = [
    "Hello, I’d like to order:",
    `- ${trimmed(meat)}: ${trimmed(qty)}kg`,
    `Deliver to: ${trimmed(delivery)}`,
    `Name: ${trimmed(name)}`,
    `Phone: ${trimmed(phone)}`,
  ];
  return lines.join("\n");
}


