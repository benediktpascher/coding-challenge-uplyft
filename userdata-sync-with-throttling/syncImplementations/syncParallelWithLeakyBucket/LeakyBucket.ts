export default class LeakyBucket {
  private readonly bucketSize: number;

  private readonly intervalSize: number; // in milliseconds

  private bucket = [];

  constructor(bucketSize: number, intervalSize: number) {
    this.bucketSize = bucketSize;
    this.intervalSize = intervalSize;
  }

  public makeMeWaitUntilIAmAllowedToShoot = async () => {
    const now = Date.now();

    // clean up bucket
    for (let i = this.bucket.length - 1; i >= 0; i -= 1) {
      // if the item is in the bucket longer than the interval -> remove it
      if (this.bucket[i] < now - this.intervalSize) {
        this.bucket.splice(i, 1);
      }
    }

    if (this.bucket.length < this.bucketSize) {
      this.bucket.push(now);
      return Promise.resolve();
    }
    await this.sleep(now - this.bucket[0]);
    return this.makeMeWaitUntilIAmAllowedToShoot();
  };

  private sleep = async (timeout) => new Promise((r) => setTimeout(r, timeout));
}
