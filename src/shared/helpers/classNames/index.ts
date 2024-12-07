
// classNames("remove-btn": имя класса, { hovered: true, selectable: true, red: false }: дополнительные свойства, ["pdg"]: свойства из вне, например state); // 'remove-btn hovered selectsble pdg'

type Mods = Record<string, string | boolean>;

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, value]) => className),
  ].join(" ");
}
