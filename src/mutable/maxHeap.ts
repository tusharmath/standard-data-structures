/**
 * A mutable MAX HEAP data-structure.
 * It can also work as a min heap by inverting the `gt` parameter.
 */
export class MaxHeap<A> {
  /**
   * Creates a new [[MaxHeap]] data structure.
   */
  public static of<A>(gt: (a: A, b: A) => boolean): MaxHeap<A> {
    return new MaxHeap(gt)
  }

  /**
   * Creates a new MaxHeap that works with numbers
   */
  public static get numbers(): MaxHeap<number> {
    return MaxHeap.of((a, b) => a > b)
  }

  private readonly stack = new Array<A>()
  private constructor(private readonly gt: (a: A, b: A) => boolean) {}

  /**
   * Returns the size of the heap
   */
  public get length(): number {
    return this.stack.length
  }

  /**
   * Returns the top most element on the heap
   */
  public get peek(): A | undefined {
    if (this.stack.length > 0) {
      return this.stack[0]
    }

    return undefined
  }

  /**
   * Remove the top element from heap.
   */
  public pop(): A | undefined {
    if (this.stack.length > 0) {
      this.swap(0, this.stack.length - 1)
      const r = this.stack.pop()
      this.heapD(0)

      return r
    }

    return undefined
  }

  /**
   * Adds a new element to the heap
   */
  public push(element: A): void {
    const i = this.stack.push(element)
    this.heapU(i - 1)
  }

  private areValid(...t: number[]): boolean {
    for (let i = 0; i < t.length; i++) {
      if (t[i] < 0 || t[i] >= this.stack.length) {
        return false
      }
    }

    return true
  }

  private heapD(i: number): void {
    const left = i * 2 + 1
    const right = i * 2 + 2
    let largest = i

    if (this.areValid(largest, left)) {
      largest = this.gt(this.stack[left], this.stack[largest]) ? left : largest
    }

    if (this.areValid(largest, right)) {
      largest = this.gt(this.stack[right], this.stack[largest])
        ? right
        : largest
    }

    if (largest !== i) {
      this.swap(largest, i)
      this.heapD(largest)
    }
  }

  private heapU(i: number): void {
    const parent = i % 2 === 0 ? (i - 2) / 2 : (i - 1) / 2
    if (this.areValid(i, parent)) {
      if (this.gt(this.stack[i], this.stack[parent])) {
        this.swap(parent, i)
        this.heapU(parent)
      }
    }
  }

  private swap(a: number, b: number): void {
    if (this.areValid(a, b) && a !== b) {
      ;[this.stack[a], this.stack[b]] = [this.stack[b], this.stack[a]]
    }
  }
}
