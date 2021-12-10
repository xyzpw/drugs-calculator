divArray = [];

document.addEventListener('input', () => {
  let calculatorType = document.getElementById('calculator-type').value;
  let halflifeDiv = document.getElementById('half-life'); divArray.push(halflifeDiv);
  let tmaxDiv = document.getElementById('tmax'); divArray.push(tmaxDiv);
  let calculateHalfLifeDiv = document.getElementById('calculate-half-life'); divArray.push(calculateHalfLifeDiv);
  let concentrationDiv = document.getElementById('concentration'); divArray.push(concentrationDiv);
  function hideDiv(divName, hide = true) {
    if (hide === true) {
      divName.style = 'visibility: hidden';
    } else {
      divName.style = 'visibility: visible';
    }
    return 0;
  }
  function showOnly(divName) {
    divArray.forEach(element => {
      if (element.id == divName.id) {
        document.getElementById(element.id).style = 'visibility: visible';
      } else {
        document.getElementById(element.id).style = 'visibility: hidden';
      }
    });
  }
  switch (calculatorType) {
    case 'half-life': {
      showOnly(halflifeDiv);
      break;
    }
    case 'tmax': {
      showOnly(tmaxDiv);
      break;
    }
    case 'calculate-half-life': {
      showOnly(calculateHalfLifeDiv);
      break;
    }
    case 'concentration': {
      showOnly(concentrationDiv);
      break;
    }
  }
});
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) document.getElementById('btn').click();
});

function getAmountRemaining(d, hl, tm) {
  let returnDecayConstant = Math.log(2) / hl;
  let returnAmountRemaining = d * Math.pow(Math.E, -(returnDecayConstant * tm));
  return returnAmountRemaining;
}

function getEliminationProbability(hl, tm) {
  let returnDecayConstant = Math.log(2) / hl;
  let returnProbability = Math.pow(Math.E, -(returnDecayConstant * tm));
  return 1 - returnProbability;
}

function getTmax(ah, eh) {
  let returnAbsorptionConstant = Math.log(2) / ah;
  let returnDecayConstant = Math.log(2) / eh;
  //let returnTmax = (Math.log(returnAbsorptionConstant) - Math.log(returnDecayConstant)) / (returnAbsorptionConstant - returnDecayConstant);
  let returnTmax = (Math.log(returnAbsorptionConstant / returnDecayConstant)) / (returnAbsorptionConstant - returnDecayConstant);
  return returnTmax;
}

function getLifetime(hl) {
  let returnDecayConstant = Math.log(2) / hl;
  let returnLifetime = 1 / returnDecayConstant;
  return returnLifetime;
}

function getHalfLife(vd, cl) {
  let returnHalfLife = Math.log(2) * vd / cl;
  return returnHalfLife;
}

function calculate() {
  switch (document.getElementById('calculator-type').value) {
    case 'half-life': {
      let dose = document.getElementById('ui-half-life-dose').value;
      let halflife = document.getElementById('ui-half-life').value;
      let halflifeUnit = document.getElementById('ui-half-life-unit').value;
      switch (halflifeUnit) {
        case 'minutes': {
          halflife /= 60;
          break;
        }
        case 'days': {
          halflife *= 24;
          break;
        }
        default: {
          //do nothing
        }
      }
      let timeAfterTmax = document.getElementById('ui-time-after-tmax').value;
      let timeAfterTmaxUnit = document.getElementById('ui-time-after-tmax-unit').value;
      switch (timeAfterTmaxUnit) {
        case 'minutes': {
          timeAfterTmax /= 60;
          break;
        }
        case 'days': {
          timeAfterTmax *= 24;
          break;
        }
        default: {
          //do nothing
        }
      }
      let returnResult = `amount remaining: ${Math.floor(getAmountRemaining(dose, halflife, timeAfterTmax) * 1000) / 1000}
      probability of elimination: ${Math.floor(getEliminationProbability(halflife, timeAfterTmax) * 1000) / 1000}
      mean lifetime: ${Math.floor(getLifetime(halflife) * 1000) / 1000} hours`;
      document.getElementById('result').innerText = returnResult;
      break;
    }
    case 'tmax': {
      let absorptionHalfLife = document.getElementById('ui-tmax-absorption-half-life').value;
      let absorptionHalfLifeUnit = document.getElementById('ui-tmax-absorption-half-life-unit').value;
      switch (absorptionHalfLifeUnit) {
        case 'minutes': {
          absorptionHalfLife /= 60;
          break;
        }
        case 'days': {
          absorptionHalfLife *= 24;
          break;
        }
        default: {
          //do nothing
        }
      }
      let halflife = document.getElementById('ui-tmax-half-life').value;
      let halflifeUnit = document.getElementById('ui-tmax-half-life-unit').value;
      switch (halflifeUnit) {
        case 'minutes': {
          halflife /= 60;
          break;
        }
        case 'days': {
          halflife *= 24;
          break;
        }
        default: {
          //do nothing
        }
      }
      let returnResult = `tmax: ${Math.floor(getTmax(absorptionHalfLife, halflife) * 1000) / 1000} hours`;
      document.getElementById('result').innerText = returnResult;
      break;
    }
    case 'calculate-half-life': {
      let volumeOfDistribution = document.getElementById('ui-calculate-half-life-vd').value;
      let volumeOfDistributionUnit = document.getElementById('ui-calculate-half-life-vd-unit').value;
      switch (volumeOfDistributionUnit) {
        case 'ml/kg': {
          volumeOfDistribution /= 1000;
          break;
        }
        default: {
          //do nothing
          break;
        }
      }
      let clearanceRate = document.getElementById('ui-calculate-half-life-cl').value;
      let clearanceRateUnit = document.getElementById('ui-calculate-half-life-cl-unit').value;
      switch (clearanceRateUnit) {
        case 'ml/kg/min': {
          clearanceRate *= 0.06;
          break;
        }
        default: {
          //do nothing
          break;
        }
      }
      let halflife = getHalfLife(volumeOfDistribution, clearanceRate);
      let returnResult = `half-life: ${Math.floor(halflife * 1000) / 1000} hours
      mean lifetime: ${Math.floor(getLifetime(halflife) * 1000) / 1000} hours`;
      document.getElementById('result').innerText = returnResult;
    }
    case 'concentration': {
    }
  }
}
