import { getTodayDateFormatted } from "../helpers/date.js";
import type { IClaimRecord } from "../types/claim.js";

const mrfTemp = {
  reporting_entity_name: "Provider Name",
  reporting_entity_type: "Provider Name",
  out_of_network:[{
    name: "Group Name",
    billing_code_type: "Claim Type",
    billing_code:"Procedure Code",
    billing_code_type_version: "1",
    description: "",
    allowed_amounts: [{
      tin: {},
      service_code: [0,1],
      billing_class: "",
      payments: [{
        allowed_amount: "",
        providers: [{
          billed_charge: "Paid",
          npi: "Provider ID"
        }],
      }],
    }]
  }],
  amount: 0,
  last_updated_on: "",
  version: "1"
}

const outOfNetworkMapper = (item: IClaimRecord) => ({
  name: item["Group Name"],
  billing_code_type: item["Claim Type"],
  billing_code: item["Procedure Code"],
  billing_code_type_version: "1",
  description: "",
  allowed_amounts: [{
    tin: {},
    service_code: [0,1],
    billing_class: "",
    payments: [{
      allowed_amount: item["Paid"],
      providers: [{
        billed_charge: item["Billed"],
        npi: item["Provider ID"]
      }],
    }],
  }]
})

type GeneratedMRFsContent = Map<string, typeof mrfTemp>;

export const generateMRFsContent = (array: IClaimRecord[], keys: (keyof IClaimRecord)[]): GeneratedMRFsContent => {
  return array.reduce((groupMap, item) => {

    const groupKey = keys.map(key => item[key]).join('-');
    
    if (!groupMap.has(groupKey)) {
      const currentMRF = {
        ...mrfTemp,
        reporting_entity_name: item["Provider Name"],
        reporting_entity_type: item["Provider Name"],
        last_updated_on: getTodayDateFormatted(),
        out_of_network: [outOfNetworkMapper(item)],
        amount: Number(item["Paid"])
      };

      groupMap.set(groupKey, currentMRF);
    }

    const enitiy = groupMap.get(groupKey)!;
    enitiy.amount = enitiy.amount + Number(item["Paid"]);
    enitiy.out_of_network.push(outOfNetworkMapper(item));
    
    return groupMap;
  }, new Map<string, typeof mrfTemp>());
};
