import { TextDecoder, TextEncoder } from "util";
import "@testing-library/jest-dom";

global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
