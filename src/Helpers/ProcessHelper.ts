interface ProcessFunction {
  (arr: any[]): Promise<any>;
}
//TODO - TEST
class ProcessHelper {
  static group = (arr: any[], entityMaxNumber: number) => {
    const nGroups = Math.ceil(arr.length / entityMaxNumber);
    var result: any[][] = [];
    for (var i = 0; i < nGroups; i++) result[i] = [];
    arr.map((c, i) => {
      result[Math.trunc(i / entityMaxNumber)].push(c);
    });
    return result;
  };

  static batchProcess = async (arr: any[], maxInGroup: number, func: ProcessFunction) => {
    const groups = ProcessHelper.group(arr, maxInGroup);
    for (var i = 0; i < groups.length; i++) {
      await Promise.all(groups[i].map(async (phd) => func(phd)));
    }
  };
}

export = ProcessHelper;
