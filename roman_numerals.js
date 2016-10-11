//
// https://en.wikipedia.org/wiki/Roman_numerals
// Roman Numeral  Hindu-Arabic Equivalent
// I              1
// V              5
// X              10
// L              50
// C              100
// D              500
// M              1000
// IV             4 = 5 - 1
// IX             9 = 10 - 1
// XL             40 = 50 - 10
// XC             90 = 100 - 10
// CD             400 = 500 - 100
// CM             900 = 1000 - 100
//

var _ = require('underscore');

function romanToArabic(value) {

  if (!value){
    return undefined;
  }

  var string = value.toString();
  var splitArray = string.split('');
  var arrayLength = splitArray.length;
  var arabicStr = 0;

  //undefined use of roman numerals check
  var nonMultiples = ['I', 'X', 'C', 'M', 'V', 'L', 'D'];
  var invalidCombo = ['IIV','XXL','IL','IC','ID','IM','XD','XM','DM', 'CCM', 'LXL', 'DCD', 'VIV'];

  //iteration thorugh multiple array with regex checks
  for(var k = 0; k < nonMultiples.length; k++){

    var re = new RegExp(nonMultiples[k],"gi");

    if(nonMultiples[k] == 'M'){
      if (string.match(re) != null && string.match(re).length > 4){
      return undefined;
      }
    }
    else if(nonMultiples[k] == 'V' || nonMultiples[k] == 'D' || nonMultiples[k] == 'L'){
      if (string.match(re) != null && string.match(re).length > 1){
      return undefined;
      }
    }
    else{
      if (string.match(re) != null && string.match(re).length > 3){
      return undefined;
      }
    }
  }

  //iteration to invalidCombo array with regex checks
  for(var m = 0; m < invalidCombo.length; m++){

    var reg = new RegExp(invalidCombo[m],"gi");

    if (string.match(reg) != null && string.match(reg)){
      return undefined;
    }
  }


  //addition of roman numerals iterating through a split array
  for(var i = 0; i<= arrayLength; i++){

    if (splitArray[arrayLength - i] == 'I'){
      arabicStr = arabicStr + 1;
    }

    else if (splitArray[arrayLength - i] == 'V'){
      if (splitArray[arrayLength - (i+1)] =='I' )
      {
        arabicStr = arabicStr + 4;
        i++;
      }
      else{
        arabicStr = arabicStr + 5;
      }
    }

    else if (splitArray[arrayLength - i] == 'X'){
      if (splitArray[arrayLength - (i+1)] =='I' )
      {
        arabicStr = arabicStr + 9;
        i++;
      }
      else{
        arabicStr = arabicStr + 10;
      }
    }

    else if (splitArray[arrayLength - i] == 'L'){
      if (splitArray[arrayLength - (i+1)] =='X' )
      {
        arabicStr = arabicStr + 40;
        i++;
      }
      else{
        arabicStr = arabicStr + 50;
      }
    }

    else if (splitArray[arrayLength - i] == 'C'){
      if (splitArray[arrayLength - (i+1)] =='X' )
      {
        arabicStr = arabicStr + 90;
        i++;
      }
      else{
        arabicStr = arabicStr + 100;
      }
    }

    else if (splitArray[arrayLength - i] == 'D'){
      if (splitArray[arrayLength - (i+1)] =='C' )
      {
        arabicStr = arabicStr + 400;
        i++;
      }
      else{
        arabicStr = arabicStr + 500;
      }
    }

    else if (splitArray[arrayLength - i] == 'M'){
      if (splitArray[arrayLength - (i+1)] =='C' )
      {
        arabicStr = arabicStr + 900;
        i++;
      }
      else{
        arabicStr = arabicStr + 1000;
      }
    }
  }

  return arabicStr;
}


//Reversal arabic to Roman

function arabicToRoman(value){

  //for a string with different sets of integers

  var multipleIntegers = value.split(' ');
  var replaceArray = [];


  for(var a = 0; a < multipleIntegers.length; a++ ){

    replaceArray.push(multipleIntegers[a]);

    if ( multipleIntegers[a] != NaN ){

      //max roman numerical value
      if (multipleIntegers[a] > 4999){
        return undefined;
      }

      var arabicNumber = multipleIntegers[a].split('');
      var romanNumber = [];

      //for each arabic number to Roman
      for(var n =0; n < arabicNumber.length; n++){

        var lastNumber = parseInt( arabicNumber[arabicNumber.length - (n+1)] );
        var romanGroups = [['I','IV','V','IX'],['X','XL','L','XC'],['C','CD','D','CM'],['M']]

        switch(true){

          case(lastNumber >= 1 && lastNumber < 4):
            romanNumber.unshift(romanGroups[n][0].repeat(lastNumber));
          break;

          case(lastNumber == 4):
            ///for 4000+ numbers
            if (n==3){
              romanNumber.unshift(romanGroups[n][0].repeat(4));
            }
            romanNumber.unshift(romanGroups[n][1]);
          break;

          case(lastNumber == 5):
            romanNumber.unshift(romanGroups[n][2]);
          break;

          case(lastNumber > 5 && lastNumber < 9):
            romanNumber.unshift(romanGroups[n][0].repeat(lastNumber-5));
            romanNumber.unshift(romanGroups[n][2]);
          break;

          case(lastNumber == 9):
            romanNumber.unshift(romanGroups[n][3]);
          break;
        }
      }
      if (lastNumber){
        replaceArray[a] = romanNumber.join('');
      }
    }
  }
  return replaceArray.join(' ');
}

  console.log(arabicToRoman('2011'));


// Tests
const Mocha = require('mocha');
const assert = require('assert');
const mocha = new Mocha({ui: 'bdd'});

// Bit of a hack to make mocha work!
mocha.suite.emit('pre-require', this, 'solution', mocha);

describe("Roman to Arabic test suite", function() {
  it("should work for the year the Corvette Stingray was introduced", function() {
    assert.equal(romanToArabic('MCMLXIII'), 1963);
  });

  it("should output 1 for input I", function() {
    assert.equal(romanToArabic('I'), 1);
  });

  it("should output 4 for number IV", function() {
    assert.equal(romanToArabic('IV'), 4);
  });

  it("should output 5 for number V", function() {
    assert.equal(romanToArabic('V'), 5);
  });

  it("should output 9 for number IX", function() {
    assert.equal(romanToArabic('IX'), 9);
  });

  it("should output 10 for input X", function() {
    assert.equal(romanToArabic('X'), 10);
  });

  it("should output 40 for number XL", function() {
    assert.equal(romanToArabic('XL'), 40);
  });

  it("should output 50 for number L", function() {
    assert.equal(romanToArabic("L"), 50);
  });

  it("should output 90 for number XC", function() {
    assert.equal(romanToArabic('XC'), 90);
  });

  it("should output 100 for number C", function() {
    assert.equal(romanToArabic("C"), 100);
  });

  it("should output 400 for input CD", function() {
    assert.equal(romanToArabic('CD'), 400);
  });

  it("should output 500 for number D", function() {
    assert.equal(romanToArabic("D"), 500);
  });

  it("should output 900 for number CM", function() {
    assert.equal(romanToArabic('CM'), 900);
  });

  it("should output 1000 for number M", function() {
    assert.equal(romanToArabic('M'), 1000);
  });

  describe('too many repetitions', function() {
    it("should not accept more than 3 'I's", function() {
      assert.equal(undefined, romanToArabic('IIII'));
      assert.equal(3, romanToArabic('III'));
    });

    it("should not accept more than 3 'X's", function() {
      assert.equal(undefined, romanToArabic('XXXX'));
      assert.equal(30, romanToArabic('XXX'));
    });

    it("should not accept more than 3 'C's", function() {
      assert.equal(undefined, romanToArabic('CCCC'));
      assert.equal(300, romanToArabic('CCC'));
    });

    it("should not accept more than 4 'M's", function() {
      assert.equal(undefined, romanToArabic('MMMMM'));
      assert.equal(4000, romanToArabic('MMMM'));
    });
  });

  describe('Subtractive Rules', function() {

      describe('Only one I, X, and C are valid for subtractive pairs', function() {
        it("cannot subtract more than 1 'I'", function() {
          assert.equal(undefined, romanToArabic('IIV'));
          assert.equal(4, romanToArabic('IV'));
        });

        it("cannot subtract more than 1 'X'", function() {
          assert.equal(undefined, romanToArabic('XXL'));
          assert.equal(40, romanToArabic('XL'));
        });

        it("cannot subtract more than 1 'C'", function() {
          assert.equal(undefined, romanToArabic('CCM'));
           assert.equal(900, romanToArabic('CM'));
        });


      });

      describe('I can only be placed before V and X', function() {
        it('should work for V and X', function() {
          assert.equal(4, romanToArabic('IV'));
          assert.equal(9, romanToArabic('IX'));
        });

        it("should ensure 'I' cannot be placed before 'L'", function() {
          assert.equal(undefined, romanToArabic('IL'));
        });

        it("should ensure 'I' cannot be placed before 'C'", function() {
          assert.equal(undefined, romanToArabic('IC'));
        });

        it("should ensure 'I' cannot be placed before 'D'", function() {
          assert.equal(undefined, romanToArabic('ID'));
        });

        it("should ensure 'I' cannot be placed before 'M'", function() {
          assert.equal(undefined, romanToArabic('IM'));
        });
      });

      describe('X can only be placed before L and C', function() {
        it('should work for L and C', function() {
          assert.equal(40, romanToArabic('XL'));
          assert.equal(90, romanToArabic('XC'));
        });

        it("should ensure 'X' cannot be placed before 'D'", function() {
          assert.equal(undefined, romanToArabic('XD'));
        });

        it("should ensure 'X' cannot be placed before 'M'", function() {
          assert.equal(undefined, romanToArabic('XM'));
        });


      });

      describe('Only C can be placed before D and M', function() {
        it("should allow 'C' before 'D' and 'M'", function() {
          assert.equal(400, romanToArabic('CD'));
          assert.equal(900, romanToArabic('CM'));
        });

        it("should not allow 'D' before 'M'", function() {
          assert.equal(undefined, romanToArabic('DM'));
        });
      });

  });

  describe('non-repeatable characters', function() {
    it("should not accept repeating 'V's", function() {
      assert.equal(undefined, romanToArabic('VV'));
      assert.equal(undefined, romanToArabic('VIV'));
    });

    it("should not accept repeating 'L's", function() {
      assert.equal(undefined, romanToArabic('LL'));
      assert.equal(undefined, romanToArabic('LXL'));
    });

    it("should not accept repeating 'D's", function() {
      assert.equal(undefined, romanToArabic('DD'));
      assert.equal(undefined, romanToArabic('DCD'));
    });
  });


});

describe("Arabic to Roman test suite", function() {
  it("should output the respect the Roman Numerals rules", function() {
    var testHash = { 1:"I", 4:"IV", 5:"V", 9:"IX", 10:"X", 40:"XL", 50:"L", 90:"XC", 100:"C", 400:"CD", 500:"D", 900:"CM", 1000:"M"}
    _.each(testHash, function(value,key){
      assert.equal(value, arabicToRoman(key));
    });
  });

  it("should output numbers bigger than 4999", function() {
    var testHash = { 5000: undefined, 29429: undefined, 420429: undefined}
    _.each(testHash, function(value,key){
      assert.equal(value, arabicToRoman(key));
    });
  });

  it("should output the Roman Numerals respectively to the Arabic Numberals", function() {
    var testHash = { 53:"LIII", 890:"DCCCXC", 530:"DXXX", 18:"XVIII", 25:"XXV", 39:"XXXIX", 71:"LXXI", 84:"LXXXIV", 99:"XCIX", 1800:"MDCCC", 41:"XLI"}
    _.each(testHash, function(value,key){
      assert.equal(value, arabicToRoman(key));
    });
  });

  it("should not output any Roman Numerals with only chars", function() {
    assert.equal(arabicToRoman('Hi my Name is Peter Ko'), 'Hi my Name is Peter Ko');
  });
});

mocha.run(function() {});
