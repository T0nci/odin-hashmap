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

  return {
    set,
    get,
    has,
  };
}

const hashMap = HashMap();
hashMap.set('White', 'Shark');

console.log(hashMap.get('Shark'));
console.log(hashMap.get('White'));
