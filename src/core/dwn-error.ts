/**
 * A class that represents a DWN error.
 */
export class DwnError extends Error {
  constructor (public code: string, message: string) {
    super(`${code}: ${message}`);

    this.name = 'DwnError';
  }
}

/**
 * DWN SDK error codes.
 */
export enum DwnErrorCode {
  AuthenticateJwsMissing = 'AuthenticateJwsMissing',
  AuthorizationMissing = 'AuthorizationMissing',
  AuthorizationUnknownAuthor = 'AuthorizationUnknownAuthor',
  HdKeyDerivationPathInvalid = 'HdKeyDerivationPathInvalid',
  RecordsWriteGetEntryIdUndefinedAuthor = 'RecordsWriteGetEntryIdUndefinedAuthor',
  MessageStoreDataCidMismatch = 'MessageStoreDataCidMismatch',
  MessageStoreDataNotFound = 'MessageStoreDataNotFound',
  MessageStoreDataSizeMismatch = 'MessageStoreDataSizeMismatch'
};
