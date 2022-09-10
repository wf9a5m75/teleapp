import { Component, ViewChild, Input } from '@angular/core';

interface ExceptionFormat {
  regExp: RegExp;
  format: string;
}

class TrieNode {
  children: { [key: string]: TrieNode } = {};

  // end of word
  eow: boolean = false;

  // Insert "-" after the character
  firstSeparator: boolean = false;

  // Insert "-" after the character
  secondSeparator: boolean = false;

  value: string = "";


  constructor(value: string = "") {
    this.value = value;
  }

  toString(): string {
    return `(${this.value}: ${this.eow} : [${this.children}])`;
  }


}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class Display  {

  trie: TrieNode = new TrieNode();

  exceptions: ExceptionFormat[] = [];

  formattedNumber: string = "";
  _value: string = "";

  constructor() {
    // console.log(this.phoneFormat("03"));
    // console.log(this.phoneFormat("019"));
    // console.log(this.phoneFormat("0123"));
    // console.log(this.phoneFormat("01532"));

    [
      "011","0123","0124","0125","0126","01267","0133","0134","0135","0136","0137",
      "01377","01372","01374","0138","0139","01392","01397","01398","0142","0143",
      "0144","0145","01456","01457","0146","01466","015","0152","0153",
      "01558","0156","01564","0157","0158","01586","01587","0162","0163","01632",
      "01634","01635","0164","01648","0165","01654","01655","01656","01658","0166",
      "0167","017","0172","0173","0174","0175","0176","0178","0179","018","0182",
      "0183","0184","0185","0186","0187","019","0191","0192","0193","0194","0195",
      "0197","0198","022","0220","0224","0225","0226","0228","0229","023",
      "0233","0234","0235","0237","0238","024","0240","0241","0242","0243","0244",
      "0246","0247","0248","025","0250","0254",
      "026","0260","0261","0263","0265","0266","0267","0268","0269","027",
      "0270","0274","0276","0277","0279","028","0280","0282","0284",
      "0285","0287","0288","029","0294","0295","0296","0297",
      "0299","03","04","042","043","0436","0438","0439","044", "045",
      "046","0460","0465","0463","0466","0467","047","0476","0478",
      "0479","048","0480","049","0493","0494","0495","04992","04994","04996","04998",
      "052","053","0531","0532","0533","0536","0537","0538","054","0544","0545",
      "0547","0548","055","0550","0551","0553","0554","0555","0556","0557","0558","0561",
      "0562","0563","0564","0565","0566","0567","0568","0569","0572","0573","0574",
      "0575","0576","05769","0577","0578","058","0581","0584","0585","0586","0587",
      "059","0594","0595","0596","0597","05979","0598","06","072","0721","0725",
      "073","0735","0736","0737","0738","0739","0740","0742","0743","0744","0745","0746",
      "07468","0747","0748","0749","075","076","0761","0763","0765","0766","0767","0768",
      "077","0770","0771","0772","0773","0774","0776","0778","0779","078","079","0790",
      "0791","0797","0798","0799","082","083","086","08387",
      "08388","084","0848","0845","0846","0847","08477","08512","08514","0852","0853",
      "0854","0855","0856","0857","0858","0859","086","087","0875","0877","0879","088","0880","0883","0884","0885","0887","0889",
      "089","0892","0893","0894","0895","0896","0897","0898","092","0920","093","0930",
      "0940","0942","0943","0944","0946","0947","0948","0949","0950","0952","0954",
      "0955","0956","0957","0959","096","0964","0965","0966","0967","0968","0969","097",
      "0972","0973","0974","0977","0978","0979","098","0980","0982","0983","0984",
      "0985","0986","0987","099"
    ].forEach((prefix: string) => {
      this.addWord(this.phoneFormat(prefix));
    });

    this.addException("042(0|90|9[2-69])", "dd-dddd-dddd");
    this.addException("047[05][2-8]", "dddd-dd-dddd");
    this.addException("0[5789]0", "ddd-dddd-dddd");
    this.addException("01547[2-9]", "ddddd-d-dddd");
    this.addException("0154[2-69]", "dddd-dd-dddd");
    this.addException("01558[2-9]", "ddddd-d-dddd");
    this.addException("0155[178]", "ddd-ddd-dddd");
    this.addException("0155[2-69]", "dddd-dd-dddd");
    this.addException("0949[2-6]", "dddd-dd-dddd");
    this.addException("0220[2-9]", "dddd-dd-dddd");
    this.addException("0223[23]", "dddd-dd-dddd");
    this.addException("0255[78]", "dddd-dd-dddd");
    this.addException("0256[2-9]", "dddd-dd-dddd");
    this.addException("0257[2-4]", "dddd-dd-dddd");
    this.addException("025(8[2-9]|9[2-8])", "dddd-dd-dddd");
    this.addException("0264[2-5]", "dddd-dd-dddd");
    this.addException("0278[2-7]", "dddd-dd-dddd");
    this.addException("0283[25-9]", "dddd-dd-dddd");
    this.addException("0289[6-9]", "dddd-dd-dddd");
    this.addException("0291(17|3[0-9]|4[0-9])", "dddd-dd-dddd");
    this.addException("0293[2-4]", "dddd-dd-dddd");
    this.addException("0476[^01]", "dddd-dd-dddd");
    this.addException("047[3-7]", "ddd-ddd-dddd");
    this.addException("047[01]", "dd-dddd-dddd");
    this.addException("0422[2-9]", "dddd-dd-dddd");
    this.addException("042(0[1-9]|9[^178])", "dd-dddd-dddd");
    this.addException("0428[2-37-9]", "dddd-dd-dddd");
    this.addException("0539(6[0-3]|7[47]|9)", "dddd-dd-dddd");
    this.addException("0538[2-9]", "dddd-dd-dddd");
    this.addException("0599[2-8]", "dddd-dd-dddd");
    this.addException("05979[234569]", "ddddd-d-dddd");
    this.addException("0597([2-4]|[79])", "dddd-dd-dddd");
    this.addException("0794[6-8]", "dddd-dd-dddd");
    this.addException("0795[23478]", "dddd-dd-dddd");
    this.addException("0796[234589]", "dddd-dd-dddd");
    this.addException("0820[2-8]", "dddd-dd-dddd");
    this.addException("0823[2-9]", "dddd-dd-dddd");
    this.addException("0824[4-8]", "dddd-dd-dddd");
    this.addException("0826[2-8]", "dddd-dd-dddd");
    this.addException("0827[2-9]", "dddd-dd-dddd");
    this.addException("0829(20|[3578]|4[0456789])", "dddd-dd-dddd");
    this.addException("0837([2345]|6[0123459])", "dddd-dd-dddd");
    this.addException("08396[245789]", "ddddd-d-dddd");
    this.addException("083[3456][2-9]", "dddd-dd-dddd");
    this.addException("0837([2-5]|6[0123459])", "dddd-dd-dddd");
    this.addException("0838[2-5]", "dddd-dd-dddd");
    this.addException("0863([2-5][0-9]|66|[78])", "dddd-dd-dddd");
    this.addException("0865([467]|5[01456789])", "dddd-dd-dddd");
    this.addException("0866([2-8]|9[0234569])", "dddd-dd-dddd");
    this.addException("0867(2[01579]|[3][0-69]|[4-9])", "dddd-dd-dddd");
    this.addException("0868[2-8]", "dddd-dd-dddd");
    this.addException("0869(34|[2678]|9[23])", "dddd-dd-dddd");
    this.addException("0958", "ddd-ddd-dddd");
    this.addException("098[89]", "ddd-ddd-dddd");
    this.addException("0982[2-9]", "dddd-dd-dddd");
    this.addException("0993([25678][0-9]|3[023456789]|4[0124689])", "dddd-dd-dddd");
    this.addException("0994([2-6]|9)", "dddd-dd-dddd");
    this.addException("0995[2-7]", "dddd-dd-dddd");
    this.addException("0996[2-8]", "dddd-dd-dddd");
    this.addException("0997[2-9]", "dddd-dd-dddd");
    this.addException("09969[2-9]", "ddddd-d-dddd");
    this.addException("0991[23][2-9]", "ddddd-d-dddd");
    this.addException("09802[2-9]", "ddddd-d-dddd");
    this.addException("09496[2-9]", "ddddd-d-dddd");
  }

  private addException(pattern: string, format: string): void {
    this.exceptions.push({
      regExp: new RegExp(`^${pattern}`),
      format,
    });
  }

  public formatNumber(value: string): string {

    let result: string[] = [];
    let hitException: boolean = false;

    for (let i: number = 0; i < this.exceptions.length; i++) {
      if (this.exceptions[i].regExp!.test(value)) {
        hitException = true;

        const formatStr: string = this.exceptions[i].format;
        let k: number = 0;
        for (let j: number = 0; (j < formatStr.length) && (k < value.length); j++) {
          if (formatStr[j] === "d" || formatStr[j] === value[k]) {
            result.push(value[k]);
            k++;
          } else {
            result.push(formatStr[j]);
          }
        }
        break;
      }
    }

    if (!hitException) {

      let parent: TrieNode = this.trie;

      let canContinue: boolean = true;
      let firstSepPos: number = -1;

      for (let i: number = 0; i < value.length; i++) {
        if (canContinue) {
          if (value[i] in parent.children) {
            parent = parent.children[value[i]];
          } else if (/^\d$/.test(value[i]) && ("d" in parent.children)) {
            parent = parent.children["d"];
          } else {
            canContinue = false;
          }
        }
        result.push(value[i]);
        if (canContinue) {
          if (parent.firstSeparator) {
            if (firstSepPos > -1) {
              result.splice(firstSepPos, 1);
            }
            firstSepPos = result.length;
            result.push("-");
          }

          if (parent.secondSeparator) {
            result.push("-");
          }
        }
      }
    }
    this.formattedNumber = result.join("");
    return this.formattedNumber;
  }

  private phoneFormat(prefix: string): string {
    const rest: number = 6 - prefix.length;

    // The first separator
    prefix += "-";

    for (let i = 0; i < rest; i++) {
      prefix += "d";
    }

    // The second separator, and the rest four numbers
    prefix += "=dddd";

    return prefix;
  }

  private addWord(word: string): void {
    let parent: TrieNode = this.trie;

    word.split("").forEach((char: string) => {
      switch(char) {
      case "-":
        parent.firstSeparator = true;
        return;

      case "=":
        parent.secondSeparator = true;
        return;

      default:
        if ((char in parent.children) === false) {
          parent.children[char] = new TrieNode(char);
        }
        parent = parent.children[char];
        break;
      }
    });
    parent.eow = true;
  }

  @Input()
  public get value() {
    return this._value;
  }

  public set value(value: string) {
    this._value = this.formatNumber(value);
  }

  onKeyDown(event: KeyboardEvent) {
    if (!/[0123456789\#\*]/.test(event.key)) {
      event.preventDefault();
    }
  }
}
