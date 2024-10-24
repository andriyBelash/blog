type AsyncOperation<T> = () => Promise<T>;
type AsyncResult<T> = [T | null, Error | null];

async function useAsyncOperation<T>(operation: AsyncOperation<T>): Promise<AsyncResult<T>> {
  try {
    const data = await operation();
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error('An unknown error occurred')];
  }
}

export default useAsyncOperation;