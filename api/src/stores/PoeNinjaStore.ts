import fetchPoeNinjaResource from "../helpers/fetchPoeNinjaResource.js";
import type { PoeNinjaResource } from "../helpers/fetchPoeNinjaResource.js";
import { writeFile } from "fs";

type PoeNinjaStoreDataField =
  | "currency"
  | "fragment"
  | "oil"
  | "incubator"
  | "scarab"
  | "fossil"
  | "resonator"
  | "essence"
  | "divinationCard"
  | "skillGem"
  | "baseType"
  | "helmetEnchant"
  | "uniqueMap"
  | "map"
  | "uniqueJewel"
  | "uniqueFlask"
  | "uniqueWeapon"
  | "uniqueArmour"
  | "uniqueAccessory"
  | "beast";

interface PoeNinjaStoreData {
  currency: any | null;
  fragment: any | null;
  oil: any | null;
  incubator: any | null;
  scarab: any | null;
  fossil: any | null;
  resonator: any | null;
  essence: any | null;
  divinationCard: any | null;
  skillGem: any | null;
  baseType: any | null;
  helmetEnchant: any | null;
  uniqueMap: any | null;
  map: any | null;
  uniqueJewel: any | null;
  uniqueFlask: any | null;
  uniqueWeapon: any | null;
  uniqueArmour: any | null;
  uniqueAccessory: any | null;
  beast: any | null;
}

class PoeNinjaStore {
  data: PoeNinjaStoreData;
  constructor() {
    this.data = {
      currency: null,
      fragment: null,
      oil: null,
      incubator: null,
      scarab: null,
      fossil: null,
      resonator: null,
      essence: null,
      divinationCard: null,
      skillGem: null,
      baseType: null,
      helmetEnchant: null,
      uniqueMap: null,
      map: null,
      uniqueJewel: null,
      uniqueFlask: null,
      uniqueWeapon: null,
      uniqueArmour: null,
      uniqueAccessory: null,
      beast: null,
    };
  }

  async fetchAll() {
    const promises: Array<Promise<any>> = [];
    for (let key of Object.keys(this.data)) {
      const resource = key[0].toUpperCase() + key.slice(1);
      const promise = this.fetchResource(resource as PoeNinjaResource);
      promises.push(promise);
    }
    Promise.all(promises).then(() => {
      console.log(this.data);
    });
  }

  async fetchResource(resource: PoeNinjaResource): Promise<any | null> {
    const data = await fetchPoeNinjaResource(resource);
    if (data == null) {
      console.log(`Failed to fetch ${resource}`);
      return null;
    }
    const dataField = resource[0].toLowerCase() + resource.slice(1);
    this.data[dataField as PoeNinjaStoreDataField] = data;
    return data;
  }
}

export default new PoeNinjaStore();
