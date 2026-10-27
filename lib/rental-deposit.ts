/** §551 BGB: ordinary residential security deposit, three cold rents maximum. */
export function checkResidentialDeposit(coldRent: number, requested: number) {
 const cold=Number.isFinite(coldRent)?Math.max(0,coldRent):0;
 const deposit=Number.isFinite(requested)?Math.max(0,requested):0;
 const maximum=Math.round(cold*300)/100;
 return {
   valid:cold>0,
   maximum,
   requested:deposit,
   exceeds: cold>0&&deposit>maximum+0.005,
   firstInstalment: Math.round(deposit/3*100)/100,
 };
}
