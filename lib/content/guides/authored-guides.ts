import { familyBenefits } from "./family-benefits";
import { parentalAllowance } from "./elterngeld";
import { parentalAllowanceReform } from "./elterngeld-reform";
import { primarySchoolChildcare } from "./primary-school-childcare";
import { christmasMarkets } from "./christmas-markets";
import { deutschlandticket2027 } from "./deutschlandticket-2027";
import { taxReturn2022 } from "./tax-return-2022";
import type { AuthoredGuide } from "./authored-guide";

export const authoredGuides = new Map<string, AuthoredGuide>(
  [christmasMarkets, deutschlandticket2027, taxReturn2022, familyBenefits, parentalAllowance, parentalAllowanceReform, primarySchoolChildcare]
    .map((article) => [article.slugs.en, article]),
);
