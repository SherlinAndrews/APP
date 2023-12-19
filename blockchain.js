var difficultyMajor = 4;


var difficultyMinor = 15;  

var maximumNonce = 8;  
var pattern = '';
for (var x=0; x<difficultyMajor; x++) {
  pattern += '0';     
  maximumNonce *= 16; /
pattern += difficultyMinor.toString(16);
var patternLen = pattern.length; 

if      (difficultyMinor == 0) { maximumNonce *= 16; } 
else if (difficultyMinor == 1) { maximumNonce *= 8;  } 
else if (difficultyMinor <= 3) { maximumNonce *= 4;  } 
else if (difficultyMinor <= 7) { maximumNonce *= 2;  } 

function sha256(block, chain) {
  return CryptoJS.SHA256(getText(block, chain));
}

function updateState(block, chain) {
  
  if ($('#block'+block+'chain'+chain+'hash').val().substr(0, patternLen) <= pattern) {
      $('#block'+block+'chain'+chain+'well').removeClass('well-error').addClass('well-success');
  }
  else {
      $('#block'+block+'chain'+chain+'well').removeClass('well-success').addClass('well-error');
  }
}

function updateHash(block, chain) {
  // update the SHA256 hash value for this block
  $('#block'+block+'chain'+chain+'hash').val(sha256(block, chain));
  updateState(block, chain);
}

function updateChain(block, chain) {
  // update all blocks walking the chain from this block to the end
  for (var x = block; x <= 5; x++) {
    if (x > 1) {
      $('#block'+x+'chain'+chain+'previous').val($('#block'+(x-1).toString()+'chain'+chain+'hash').val());
    }
    updateHash(x, chain);
  }
}

function mine(block, chain, isChain) {
  for (var x = 0; x <= maximumNonce; x++) {
    $('#block'+block+'chain'+chain+'nonce').val(x);
    $('#block'+block+'chain'+chain+'hash').val(sha256(block, chain));
    if ($('#block'+block+'chain'+chain+'hash').val().substr(0, patternLen) <= pattern) {
      if (isChain) {
        updateChain(block, chain);
      }
      else {
        updateState(block, chain);
      }
      break;
    }
  }
}

