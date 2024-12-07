import "@testing-library/jest-dom";
// import "regenerator-runtime/runtime"; // не пригодилось
import { TextEncoder, TextDecoder } from "util";
if (typeof global.TextEncoder === "undefined") {
   global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
   global.TextDecoder = TextDecoder;
}
