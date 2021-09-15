function comparator(prev, next) {
  return JSON.stringify(prev) === JSON.stringify(next);
}

export { comparator };
