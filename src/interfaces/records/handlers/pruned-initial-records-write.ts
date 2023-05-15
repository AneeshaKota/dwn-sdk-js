import type { EventLog } from '../../../event-log/event-log.js';
import type { Readable } from 'readable-stream';
import type { BaseMessage, TimestampedMessage } from '../../../core/types.js';
import type { DataStore, MessageStore, RecordsWriteMessage } from '../../../index.js';

import { Message } from '../../../core/message.js';
import { RecordsWriteHandler } from './records-write.js';

/**
 * Handler for initial `RecordsWrite` that already have its data pruned thus cannot supply data stream for it.
 * NOTE: This is intended to be ONLY used by sync.
 */
export class PrunedInitialRecordsWriteHandler extends RecordsWriteHandler {
  /**
   * Overriding parent behavior, `undefined` data stream is allowed.
   */
  protected validateUndefinedDataStream(
    _dataStream: Readable | undefined,
    _newestExistingMessage: TimestampedMessage | undefined,
    _incomingMessage: RecordsWriteMessage): void { }

  /**
   * Stores the given message without storing the associated data.
   * Requires `dataCid` to exist in the `RecordsWrite` message given.
   */
  protected async storeMessage(
    messageStore: MessageStore,
    _dataStore: DataStore,
    eventLog: EventLog,
    tenant: string,
    message: BaseMessage,
    indexes: Record<string, string>,
    _dataStream?: Readable): Promise<void> {

    const messageCid = await Message.getCid(message);
    await messageStore.put(tenant, message, indexes);
    await eventLog.append(tenant, messageCid);
  }
}
