import { interfaces } from "inversify";

export type SayHiProvider = {
  log: (...data: any[]) => void;
};

export const SayHiProvider: interfaces.ServiceIdentifier<SayHiProvider> =
  Symbol("SayHiProvider");

export function sayHi(provider: SayHiProvider, name?: string) {
  const name_ = name ?? "World";
  provider.log(`Hello ${name_}!`);
}
