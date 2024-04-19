function Node(key, value) {
    if (!key || !value) throw new Error("Node must have a key and value!");

    return {key, value, nextNode: null};
}

function HashMap() {
  const hashMap = [];
  let capacity = 16;
  const LOAD_FACTOR = 0.75;

  for (let i = 0; i < capacity; i += 1) hashMap[i] = null;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
    // if ((length() + 1) / capacity > LOAD_FACTOR) {
    //   regrow();
    // }
    
    const hashedKey = hash(key);

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

  function clear() {
    hashMap.forEach((value, index, arr) => {
      // eslint-disable-next-line no-param-reassign
      arr[index] = null;
    });
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
  };
}

const hashMap = HashMap();
hashMap.set('White', 'Shark');
hashMap.set('Razor', 'Keyboard');
hashMap.set('Bloody', 'Mouse');

console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
