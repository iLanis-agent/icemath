/* IceMath engine - honest cold plunge / ice bath math. Pure functions, no DOM. */
var IceEngine = (function () {
  var FUSION_KJ_PER_KG = 334;   /* latent heat of fusion of ice */
  var WATER_KJ_PER_KG_C = 4.186; /* specific heat of water */
  var LB_PER_KG = 2.2046;

  function r1(x) { return Math.round(x * 10) / 10; }

  /* ice needed: each kg of 0C ice absorbs 334 kJ to melt, then the meltwater
     warms to the target, absorbing 4.186 kJ per degree more. */
  function iceKgNeeded(waterLiters, startC, targetC) {
    var removeKj = waterLiters * WATER_KJ_PER_KG_C * (startC - targetC);
    var perKg = FUSION_KJ_PER_KG + WATER_KJ_PER_KG_C * targetC;
    if (perKg <= 0) return null;
    return r1(removeKj / perKg);
  }
  function iceLbNeeded(waterLiters, startC, targetC) {
    return r1(iceKgNeeded(waterLiters, startC, targetC) * LB_PER_KG);
  }
  function bagsNeeded(waterLiters, startC, targetC, bagLb) {
    var lb = iceLbNeeded(waterLiters, startC, targetC);
    return Math.ceil(lb / bagLb);
  }
  function iceCost(waterLiters, startC, targetC, bagLb, bagPrice) {
    return r1(bagsNeeded(waterLiters, startC, targetC, bagLb) * bagPrice);
  }

  /* tub water accounting: your body displaces water */
  function waterForTub(tubLiters, bodyLiters) {
    return Math.max(0, Math.round(tubLiters - bodyLiters));
  }

  /* target-temperature honesty */
  function tempVerdict(targetC) {
    if (targetC > 15) return 'mild - over 15C is cool, not cold; benefits are mostly in your head';
    if (targetC >= 10) return 'standard - 10-15C is the working range most protocols aim for';
    if (targetC >= 5) return 'cold - 5-10C is advanced territory; short exposures only';
    return 'extreme - under 5C, single-digit minutes and never alone';
  }
  /* exposure honesty by temperature */
  function exposureMinutes(targetC, experienced) {
    var base;
    if (targetC > 15) base = experienced ? 10 : 5;
    else if (targetC >= 10) base = experienced ? 5 : 2;
    else if (targetC >= 5) base = experienced ? 3 : 1;
    else base = 1;
    return base;
  }

  /* re-chill: how much ice to pull a used tub back down a few degrees */
  function rechillKg(waterLiters, currentC, targetC) {
    return iceKgNeeded(waterLiters, currentC, targetC);
  }

  return {
    iceKgNeeded: iceKgNeeded, iceLbNeeded: iceLbNeeded, bagsNeeded: bagsNeeded,
    iceCost: iceCost, waterForTub: waterForTub, tempVerdict: tempVerdict,
    exposureMinutes: exposureMinutes, rechillKg: rechillKg
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = IceEngine;
