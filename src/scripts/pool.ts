// object pool mixin
export default function poolMixin<T>() {
  class Pool {
    static _pool: Array<T> = new Array<T>();

    static poolGet(): T|any {
      // return from pool or create new instance
      return Pool._pool.pop() || new this as T;
    }

    static poolPut(obj: T) {
      Pool._pool.push(obj);
    }
  }

  return Pool;
}