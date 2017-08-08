// @flow
type CancelablePromise<T> = {
  promise: Promise<T>;
  cancel: Function;
};

const makeCancelable = <T>(promise: Promise<T>): CancelablePromise<T> => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val =>
      (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
    );
    promise.catch(error =>
      (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export default makeCancelable;
