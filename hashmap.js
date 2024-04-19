class Node {
  constructor(key, value) {
    if (!key || !value) throw new Error("Node must have a key and value!");

    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

function HashMap() {
  const hashMap = [];
  const capacity = 16;
  const LOAD_FACTOR = 0.75;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  return {};
}
