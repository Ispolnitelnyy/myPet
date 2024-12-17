// classNames("remove-btn": имя класса, { hovered: true, selectable: true, red: false }: дополнительные свойства, ["pdg"]: свойства из вне, например state); // 'remove-btn hovered selectsble pdg'

export type Mods = Record<string, string | boolean | undefined>;

export function classNames(
   cls: string,
   mods: Mods = {},
   additional: (string | undefined)[] = []
): string {
   return [
      cls,
      ...additional.filter(Boolean),
      ...Object.entries(mods)
         .filter(([className, value]) => Boolean(value))
         .map(([className, value]) => className),
   ].join(" ");
}
