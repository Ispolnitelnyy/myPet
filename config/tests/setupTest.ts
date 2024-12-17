import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
if (typeof global.TextEncoder === "undefined") {
   global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
   // global.TextDecoder = TextDecoder; // TS2322: Type 'typeof TextDecoder' is not assignable to type
   (global as any).TextDecoder = TextDecoder;
}
