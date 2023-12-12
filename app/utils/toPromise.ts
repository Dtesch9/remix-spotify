export async function toPromise<T>(toPromise: T, resolveIn = 3000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(toPromise), resolveIn);
  });
}
