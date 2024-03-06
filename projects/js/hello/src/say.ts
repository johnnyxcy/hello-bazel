export type SayHiProvider = {
  log: (...data: any[]) => void;
};

export function sayHi(provider: SayHiProvider) {
  provider.log("Hello from say.ts");
}
