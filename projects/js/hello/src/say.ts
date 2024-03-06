import { interfaces } from "inversify";

export type SayHiProvider = {
  log: (...data: any[]) => void;
};

const SayHiProvider: interfaces.ServiceIdentifier<SayHiProvider> =
  Symbol("SayHiProvider");

export function sayHi(provider: SayHiProvider) {
  provider.log("Hello from say.ts");
}
