import kleur from "kleur";

export const color = {
  cyan: (str: string) => kleur.cyan(str),
  green: (str: string) => kleur.green(str),
  yellow: (str: string) => kleur.yellow(str),
  red: (str: string) => kleur.red(str),
  gray: (str: string) => kleur.gray(str),
};
