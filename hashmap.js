function Node(key, value) {
    if (!key || !value) throw new Error("Node must have a key and value!");

    return {key, value, nextNode: null};
}

function HashMap() {
  const hashMap = [];
  let capacity = 16;
  const LOAD_FACTOR = 0.75;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function length() {
    let lengthOfMap = 0;
    hashMap.forEach((value, index, arr) => {
      if (arr[index] !== null) {
        let node = arr[index];

        while (node.nextNode !== null) {
          lengthOfMap += 1;
          node = node.nextNode;
        }

        lengthOfMap += 1;
      }
    });

    return lengthOfMap;
  }

  function entries() {
    const entriesArr = [];
    hashMap.forEach((value, index, arr) => {
      if (arr[index] !== null) {
        let node = arr[index];

        while (node.nextNode !== null) {
          entriesArr.push([node.key, node.value]);
          node = node.nextNode;
        }

        entriesArr.push([node.key, node.value]);
      }
    });

    return entriesArr;
  }

  function clear() {
    for (let i = 0; i < capacity; i += 1) {
      hashMap[i] = null;
    }
  }

  function regrow() {
    const entriesArr = entries();

    capacity *= 2;

    clear();

    entriesArr.forEach((value) => {
      // eslint-disable-next-line no-use-before-define
      set(value[0], value[1]);
    });
  }

  function set(key, value) {
    if ((length() + 1) / capacity >= LOAD_FACTOR) {
      regrow();
    }
    
    const hashedKey = hash(key);
    if (hashedKey < 0 || hashedKey >= capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (hashMap[hashedKey] === null) {
      hashMap[hashedKey] = Node(key, value);
      return;
    }

    let node = hashMap[hashedKey];
    while (node.nextNode !== null) {
      if (node.key === key) {
        node.value = value;
        return;
      }

      node = node.nextNode;
    }

    if (node.key === key) {
      node.value = value;
      return;
    }

    node.nextNode = Node(key, value);
  }

  function get(key) {
    const hashedKey = hash(key);
    if (hashedKey < 0 || hashedKey >= capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (hashMap[hashedKey] === null) {
      return null;
    }

    let node = hashMap[hashedKey];
    while (node.nextNode !== null) {
      if (node.key === key) {
        return node.value;
      }

      node = node.nextNode;
    }

    if (node.key === key) {
      return node.value;
    }

    return null;
  }

  function has(key) {
    const hashedKey = hash(key);
    if (hashedKey < 0 || hashedKey >= capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (hashMap[hashedKey] === null) {
      return false;
    }

    let node = hashMap[hashedKey];
    while (node.nextNode !== null) {
      if (node.key === key) {
        return true;
      }

      node = node.nextNode;
    }

    if (node.key === key) {
      return true;
    }

    return false;
  }

  function remove(key) {
    const hashedKey = hash(key);
    if (hashedKey < 0 || hashedKey >= capacity) {
      throw new Error("Trying to access index out of bound");
    }

    if (hashMap[hashedKey] === null) {
      return false;
    }

    if (hashMap[hashedKey].nextNode === null) {
      if (hashMap[hashedKey].key === key) {
        hashMap[hashedKey] = null;
        return true;
      }

      return false;
    }

    let curr = hashMap[hashedKey];
    let prev = null;
    while (curr.nextNode !== null) {
      if (curr.key === key) {
        prev.nextNode = curr.nextNode;
        return true;
      }

      prev = curr;
      curr = curr.nextNode;
    }

    if (curr.key === key) {
      prev.nextNode = curr.nextNode;
      return true;
    }

    return false;
  }

  function keys() {
    const keysArr = [];
    hashMap.forEach((value, index, arr) => {
      if (arr[index] !== null) {
        let node = arr[index];

        while (node.nextNode !== null) {
          keysArr.push(node.key);
          node = node.nextNode;
        }

        keysArr.push(node.key);
      }
    });

    return keysArr;
  }

  function values() {
    const valuesArr = [];
    hashMap.forEach((value, index, arr) => {
      if (arr[index] !== null) {
        let node = arr[index];

        while (node.nextNode !== null) {
          valuesArr.push(node.value);
          node = node.nextNode;
        }

        valuesArr.push(node.value);
      }
    });

    return valuesArr;
  }

  function mapToString() {
    let string = '';
    for (let i = 0; i < capacity; i += 1) {
      if (hashMap[i] !== null) {
        string += `${i} -> `;

        let node = hashMap[i];
        while (node !== null) {
          string += `(${node.key}, ${node.value}) -> `;
          node = node.nextNode;
        }

        string += 'null\n';
      } else {
        string += `${i} -> null\n`;
      }
    }
    return string;
  }

  clear(); // To fill the current buckets with null instead of undefined
  return {
    set,
    get,
    has,
    remove,
    clear,
    length,
    keys,
    values,
    entries,
    getCapacity() {
      return capacity;
    },
    mapToString,
  };
}

const hashMap = HashMap();

hashMap.set("1", "1");
hashMap.set("2", "2");
hashMap.set("3", "1");
hashMap.set("4", "2");
hashMap.set("5", "1");
hashMap.set("6", "2");
hashMap.set("7", "1");
hashMap.set("8", "2");
hashMap.set("9", "1");
hashMap.set("10", "2");
hashMap.set("11", "1");

// Test for remove, has, get
hashMap.remove("11");
console.log(hashMap.has("11"));
hashMap.set("11", "0");
console.log(hashMap.get("11"));
console.log(hashMap.mapToString(), `Buckets: ${hashMap.getCapacity()}`);

// Tests for set, keys, values, entries, length, clear, regrowth
hashMap.set("12", "2");
console.log(
  hashMap.keys(), hashMap.values(), hashMap.entries(), hashMap.length()
);
hashMap.clear();
console.log(hashMap.mapToString(), `Buckets: ${hashMap.getCapacity()}`);

// optional TODO: build a HashSet which only has keys(prob easy)
