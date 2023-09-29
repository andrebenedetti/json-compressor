/*
    Merges map2 into map1 and returns map1,
    summing key counts if key is in both maps.
*/
export function mergeMaps(map1: Map<string, number>, map2: Map<string, number>) {
  for (let [key, value] of map2) {
    if (map1.get(key)) {
      map1.set(key, (map1.get(key) || 0) + value);
    } else {
      map1.set(key, value);
    }
  }

  return map1;
}


/*
    Find longest substring occurring in both
    str1 and str2, given that [str1, str2]
    belong to the same suffix array.
    For example,
    str1 = "issippi"
    str2 = "ississippi"
    returns "issi"
*/
export function longestSubtring(str1: string, str2: string) {
  let i = 0;
  while (str1[i] === str2[i] && str1[i] !== undefined) {
    i++;
  }

  return str1.slice(0, i);
}

export function replaceArrayValues(arr, from, to) {
  return arr.map((v) => {
    if (v === from) {
      return to;
    }

    if (typeof v !== "object" || v === null) {
      return v;
    }

    if (Array.isArray(v)) {
      return replaceArrayValues(v, from, to)
    }

    return replaceAllStrings(v, from, to)
  });
}


export function replaceAllStrings(obj: Object, from: string, to: string) {
  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      obj[key] = value.replace(from, to);

      continue;
    }

    if (typeof value !== 'object' || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      obj[key] = replaceArrayValues(value, from, to)
    } else {
      obj[key] = replaceAllStrings(obj[key], from, to);
    }
  }

  return obj
};

/*
    Returns a Map with keyName -> count
*/
export function countKeyOccurence(obj: Object) {
  const keys = new Map();

  if (typeof obj !== 'object' || obj === null) {
    return new Map()
  }

  for (let key of Object.keys(obj)) {
    keys.set(key, (keys.get(key) || 0) + 1);
    if (obj !== null && typeof obj[key] === "object") {
      if (Array.isArray(obj[key])) {
        for (let item of obj[key]) {
          mergeMaps(keys, countKeyOccurence(item))
        }
      } else {
        mergeMaps(keys, countKeyOccurence(obj[key]));
      }
    }
  }

  return keys;
}

export function getAllStrings(obj: Object) {
  if (typeof obj === "string") {
    return [obj];
  }

  if (obj === null || typeof obj !== "object") {
    return [];
  }

  let result: string[] = [];
  if (Array.isArray(obj)) {
    for (let item of obj) {
      result = [...result, ...getAllStrings(item)];
    }
  } else {
    for (let [_, value] of Object.entries(obj)) {
      result = [...result, ...getAllStrings(value)];
    }
  }

  return result
}