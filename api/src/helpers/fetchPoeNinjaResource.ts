export type PoeNinjaResource =
  | "Currency"
  | "Fragment"
  | "Oil"
  | "Incubator"
  | "Scarab"
  | "Fossil"
  | "Resonator"
  | "Essence"
  | "DivinationCard"
  | "SkillGem"
  | "BaseType"
  | "HelmetEnchant"
  | "UniqueMap"
  | "Map"
  | "UniqueJewel"
  | "UniqueFlask"
  | "UniqueWeapon"
  | "UniqueArmour"
  | "UniqueAccessory"
  | "Beast";

function getResourceUrl(resource: PoeNinjaResource, currentLeague: string) {
  const table: { [key in PoeNinjaResource]: string } = {
    Currency: `https://poe.ninja/api/data/currencyoverview?league=${currentLeague}&type=Currency`,
    Fragment: `https://poe.ninja/api/data/currencyoverview?league=${currentLeague}&type=Fragment`,
    Oil: `https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=Oil`,
    Incubator: `https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=Incubator`,
    Scarab: `https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=Scarab`,
    Fossil: `https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=Fossil`,
    Resonator: `https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=Resonator`,
    Essence: `https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=Essence`,
    DivinationCard: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=DivinationCard`,
    SkillGem: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=SkillGem`,
    BaseType: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=BaseType`,
    HelmetEnchant: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=HelmetEnchant`,
    UniqueMap: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=UniqueMap`,
    Map: `https://poe.ninja/api/data/itemoverview?type=Map&league=${currentLeague}`,
    UniqueJewel: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=UniqueJewel`,
    UniqueFlask: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=UniqueFlask`,
    UniqueWeapon: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=UniqueWeapon`,
    UniqueArmour: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=UniqueArmour`,
    UniqueAccessory: ` 	https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=UniqueAccessory`,
    Beast: `https://poe.ninja/api/data/itemoverview?league=${currentLeague}&type=Beast`,
  };
  return table[resource];
}

const fetchPoeNinjaResource = async (
  resource: PoeNinjaResource
): Promise<any | null> => {
  const url = getResourceUrl(resource, "Sanctum");

  const result = await fetch(url, { method: "GET" });
  if (result.ok) {
    const data = await result.json();
    return data;
  }
  return null;
};

export default fetchPoeNinjaResource;
