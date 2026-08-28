if (typeof globalThis !== "undefined" && !(globalThis as any).GPUShaderStage) {
  (globalThis as any).GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };
}
if (typeof self !== "undefined" && !(self as any).GPUShaderStage) {
  (self as any).GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };
}
if (typeof window !== "undefined" && !(window as any).GPUShaderStage) {
  (window as any).GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };
}
export {};
