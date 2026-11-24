import { describe, expect, it } from "vitest";
import { deliveryFee } from "./delivery";

describe("taxas de entrega", () => {
  it("região central custa R$ 8", () => expect(deliveryFee("centro", 50)).toBe(8));
  it("bairros distantes custam R$ 18", () => expect(deliveryFee("distante", 50)).toBe(18));
  it("entrega grátis a partir de R$ 200", () => expect(deliveryFee("distante", 200)).toBe(0));
});
