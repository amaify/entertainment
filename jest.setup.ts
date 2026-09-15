import { TextDecoder, TextEncoder } from "node:util";
import "@testing-library/jest-dom";

global.TextEncoder = TextEncoder;
// biome-ignore lint/suspicious/noExplicitAny: Nothing
(global as any).TextDecoder = TextDecoder;
