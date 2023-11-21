import $protobuf from 'protobufjs/minimal.js';

const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

const $root = $protobuf.roots || ($protobuf.roots = {});

export const PB = ($root.PB = (() => {
  const PB = {};

  PB.CommandStatus = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = 'OK')] = 0;
    values[(valuesById[1] = 'ERROR')] = 1;
    values[(valuesById[2] = 'ERROR_DECODE')] = 2;
    values[(valuesById[3] = 'ERROR_NOT_IMPLEMENTED')] = 3;
    values[(valuesById[4] = 'ERROR_BUSY')] = 4;
    values[(valuesById[14] = 'ERROR_CONTINUOUS_COMMAND_INTERRUPTED')] = 14;
    values[(valuesById[15] = 'ERROR_INVALID_PARAMETERS')] = 15;
    return values;
  })();

  PB.Empty = (function () {
    function Empty(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    Empty.create = function create(properties) {
      return new Empty(properties);
    };

    Empty.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      return writer;
    };

    Empty.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    Empty.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.PB.Empty();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    Empty.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    Empty.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      return null;
    };

    Empty.fromObject = function fromObject(object) {
      if (object instanceof $root.PB.Empty) return object;
      return new $root.PB.Empty();
    };

    Empty.toObject = function toObject() {
      return {};
    };

    Empty.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Empty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/PB.Empty';
    };

    return Empty;
  })();

  PB.StopSession = (function () {
    function StopSession(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    StopSession.create = function create(properties) {
      return new StopSession(properties);
    };

    StopSession.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      return writer;
    };

    StopSession.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    StopSession.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.PB.StopSession();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    StopSession.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    StopSession.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      return null;
    };

    StopSession.fromObject = function fromObject(object) {
      if (object instanceof $root.PB.StopSession) return object;
      return new $root.PB.StopSession();
    };

    StopSession.toObject = function toObject() {
      return {};
    };

    StopSession.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    StopSession.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/PB.StopSession';
    };

    return StopSession;
  })();

  PB.Main = (function () {
    function Main(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    Main.prototype.commandId = 0;
    Main.prototype.commandStatus = 0;
    Main.prototype.hasNext = false;
    Main.prototype.empty = null;
    Main.prototype.stopSession = null;
    Main.prototype.systemPingRequest = null;
    Main.prototype.systemPingResponse = null;
    Main.prototype.systemDeviceInfoRequest = null;
    Main.prototype.systemDeviceInfoResponse = null;

    let $oneOfFields;

    Object.defineProperty(Main.prototype, 'content', {
      get: $util.oneOfGetter(
        ($oneOfFields = [
          'empty',
          'stopSession',
          'systemPingRequest',
          'systemPingResponse',
          'systemDeviceInfoRequest',
          'systemDeviceInfoResponse',
        ]),
      ),
      set: $util.oneOfSetter($oneOfFields),
    });

    Main.create = function create(properties) {
      return new Main(properties);
    };

    Main.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.commandId != null &&
        Object.hasOwnProperty.call(message, 'commandId')
      )
        writer.uint32(8).uint32(message.commandId);
      if (
        message.commandStatus != null &&
        Object.hasOwnProperty.call(message, 'commandStatus')
      )
        writer.uint32(16).int32(message.commandStatus);
      if (
        message.hasNext != null &&
        Object.hasOwnProperty.call(message, 'hasNext')
      )
        writer.uint32(24).bool(message.hasNext);
      if (message.empty != null && Object.hasOwnProperty.call(message, 'empty'))
        $root.PB.Empty.encode(message.empty, writer.uint32(34).fork()).ldelim();
      if (
        message.systemPingRequest != null &&
        Object.hasOwnProperty.call(message, 'systemPingRequest')
      )
        $root.PB_System.PingRequest.encode(
          message.systemPingRequest,
          writer.uint32(42).fork(),
        ).ldelim();
      if (
        message.systemPingResponse != null &&
        Object.hasOwnProperty.call(message, 'systemPingResponse')
      )
        $root.PB_System.PingResponse.encode(
          message.systemPingResponse,
          writer.uint32(50).fork(),
        ).ldelim();
      if (
        message.stopSession != null &&
        Object.hasOwnProperty.call(message, 'stopSession')
      )
        $root.PB.StopSession.encode(
          message.stopSession,
          writer.uint32(154).fork(),
        ).ldelim();
      if (
        message.systemDeviceInfoRequest != null &&
        Object.hasOwnProperty.call(message, 'systemDeviceInfoRequest')
      )
        $root.PB_System.DeviceInfoRequest.encode(
          message.systemDeviceInfoRequest,
          writer.uint32(258).fork(),
        ).ldelim();
      if (
        message.systemDeviceInfoResponse != null &&
        Object.hasOwnProperty.call(message, 'systemDeviceInfoResponse')
      )
        $root.PB_System.DeviceInfoResponse.encode(
          message.systemDeviceInfoResponse,
          writer.uint32(266).fork(),
        ).ldelim();
      return writer;
    };

    Main.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    Main.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.PB.Main();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.commandId = reader.uint32();
            break;
          }
          case 2: {
            message.commandStatus = reader.int32();
            break;
          }
          case 3: {
            message.hasNext = reader.bool();
            break;
          }
          case 4: {
            message.empty = $root.PB.Empty.decode(reader, reader.uint32());
            break;
          }
          case 19: {
            message.stopSession = $root.PB.StopSession.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          case 5: {
            message.systemPingRequest = $root.PB_System.PingRequest.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          case 6: {
            message.systemPingResponse = $root.PB_System.PingResponse.decode(
              reader,
              reader.uint32(),
            );
            break;
          }
          case 32: {
            message.systemDeviceInfoRequest =
              $root.PB_System.DeviceInfoRequest.decode(reader, reader.uint32());
            break;
          }
          case 33: {
            message.systemDeviceInfoResponse =
              $root.PB_System.DeviceInfoResponse.decode(
                reader,
                reader.uint32(),
              );
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    Main.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    Main.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      let properties = {};
      if (message.commandId != null && message.hasOwnProperty('commandId'))
        if (!$util.isInteger(message.commandId))
          return 'commandId: integer expected';
      if (
        message.commandStatus != null &&
        message.hasOwnProperty('commandStatus')
      )
        switch (message.commandStatus) {
          default:
            return 'commandStatus: enum value expected';
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 14:
          case 15:
            break;
        }
      if (message.hasNext != null && message.hasOwnProperty('hasNext'))
        if (typeof message.hasNext !== 'boolean')
          return 'hasNext: boolean expected';
      if (message.empty != null && message.hasOwnProperty('empty')) {
        properties.content = 1;
        {
          let error = $root.PB.Empty.verify(message.empty);
          if (error) return 'empty.' + error;
        }
      }
      if (
        message.stopSession != null &&
        message.hasOwnProperty('stopSession')
      ) {
        if (properties.content === 1) return 'content: multiple values';
        properties.content = 1;
        {
          let error = $root.PB.StopSession.verify(message.stopSession);
          if (error) return 'stopSession.' + error;
        }
      }
      if (
        message.systemPingRequest != null &&
        message.hasOwnProperty('systemPingRequest')
      ) {
        if (properties.content === 1) return 'content: multiple values';
        properties.content = 1;
        {
          let error = $root.PB_System.PingRequest.verify(
            message.systemPingRequest,
          );
          if (error) return 'systemPingRequest.' + error;
        }
      }
      if (
        message.systemPingResponse != null &&
        message.hasOwnProperty('systemPingResponse')
      ) {
        if (properties.content === 1) return 'content: multiple values';
        properties.content = 1;
        {
          let error = $root.PB_System.PingResponse.verify(
            message.systemPingResponse,
          );
          if (error) return 'systemPingResponse.' + error;
        }
      }
      if (
        message.systemDeviceInfoRequest != null &&
        message.hasOwnProperty('systemDeviceInfoRequest')
      ) {
        if (properties.content === 1) return 'content: multiple values';
        properties.content = 1;
        {
          let error = $root.PB_System.DeviceInfoRequest.verify(
            message.systemDeviceInfoRequest,
          );
          if (error) return 'systemDeviceInfoRequest.' + error;
        }
      }
      if (
        message.systemDeviceInfoResponse != null &&
        message.hasOwnProperty('systemDeviceInfoResponse')
      ) {
        if (properties.content === 1) return 'content: multiple values';
        properties.content = 1;
        {
          let error = $root.PB_System.DeviceInfoResponse.verify(
            message.systemDeviceInfoResponse,
          );
          if (error) return 'systemDeviceInfoResponse.' + error;
        }
      }
      return null;
    };

    Main.fromObject = function fromObject(object) {
      if (object instanceof $root.PB.Main) return object;
      let message = new $root.PB.Main();
      if (object.commandId != null) message.commandId = object.commandId >>> 0;
      switch (object.commandStatus) {
        default:
          if (typeof object.commandStatus === 'number') {
            message.commandStatus = object.commandStatus;
            break;
          }
          break;
        case 'OK':
        case 0:
          message.commandStatus = 0;
          break;
        case 'ERROR':
        case 1:
          message.commandStatus = 1;
          break;
        case 'ERROR_DECODE':
        case 2:
          message.commandStatus = 2;
          break;
        case 'ERROR_NOT_IMPLEMENTED':
        case 3:
          message.commandStatus = 3;
          break;
        case 'ERROR_BUSY':
        case 4:
          message.commandStatus = 4;
          break;
        case 'ERROR_CONTINUOUS_COMMAND_INTERRUPTED':
        case 14:
          message.commandStatus = 14;
          break;
        case 'ERROR_INVALID_PARAMETERS':
        case 15:
          message.commandStatus = 15;
          break;
      }
      if (object.hasNext != null) message.hasNext = Boolean(object.hasNext);
      if (object.empty != null) {
        if (typeof object.empty !== 'object')
          throw TypeError('.PB.Main.empty: object expected');
        message.empty = $root.PB.Empty.fromObject(object.empty);
      }
      if (object.stopSession != null) {
        if (typeof object.stopSession !== 'object')
          throw TypeError('.PB.Main.stopSession: object expected');
        message.stopSession = $root.PB.StopSession.fromObject(
          object.stopSession,
        );
      }
      if (object.systemPingRequest != null) {
        if (typeof object.systemPingRequest !== 'object')
          throw TypeError('.PB.Main.systemPingRequest: object expected');
        message.systemPingRequest = $root.PB_System.PingRequest.fromObject(
          object.systemPingRequest,
        );
      }
      if (object.systemPingResponse != null) {
        if (typeof object.systemPingResponse !== 'object')
          throw TypeError('.PB.Main.systemPingResponse: object expected');
        message.systemPingResponse = $root.PB_System.PingResponse.fromObject(
          object.systemPingResponse,
        );
      }
      if (object.systemDeviceInfoRequest != null) {
        if (typeof object.systemDeviceInfoRequest !== 'object')
          throw TypeError('.PB.Main.systemDeviceInfoRequest: object expected');
        message.systemDeviceInfoRequest =
          $root.PB_System.DeviceInfoRequest.fromObject(
            object.systemDeviceInfoRequest,
          );
      }
      if (object.systemDeviceInfoResponse != null) {
        if (typeof object.systemDeviceInfoResponse !== 'object')
          throw TypeError('.PB.Main.systemDeviceInfoResponse: object expected');
        message.systemDeviceInfoResponse =
          $root.PB_System.DeviceInfoResponse.fromObject(
            object.systemDeviceInfoResponse,
          );
      }
      return message;
    };

    Main.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.commandId = 0;
        object.commandStatus = options.enums === String ? 'OK' : 0;
        object.hasNext = false;
      }
      if (message.commandId != null && message.hasOwnProperty('commandId'))
        object.commandId = message.commandId;
      if (
        message.commandStatus != null &&
        message.hasOwnProperty('commandStatus')
      )
        object.commandStatus =
          options.enums === String
            ? $root.PB.CommandStatus[message.commandStatus] === undefined
              ? message.commandStatus
              : $root.PB.CommandStatus[message.commandStatus]
            : message.commandStatus;
      if (message.hasNext != null && message.hasOwnProperty('hasNext'))
        object.hasNext = message.hasNext;
      if (message.empty != null && message.hasOwnProperty('empty')) {
        object.empty = $root.PB.Empty.toObject(message.empty, options);
        if (options.oneofs) object.content = 'empty';
      }
      if (
        message.systemPingRequest != null &&
        message.hasOwnProperty('systemPingRequest')
      ) {
        object.systemPingRequest = $root.PB_System.PingRequest.toObject(
          message.systemPingRequest,
          options,
        );
        if (options.oneofs) object.content = 'systemPingRequest';
      }
      if (
        message.systemPingResponse != null &&
        message.hasOwnProperty('systemPingResponse')
      ) {
        object.systemPingResponse = $root.PB_System.PingResponse.toObject(
          message.systemPingResponse,
          options,
        );
        if (options.oneofs) object.content = 'systemPingResponse';
      }
      if (
        message.stopSession != null &&
        message.hasOwnProperty('stopSession')
      ) {
        object.stopSession = $root.PB.StopSession.toObject(
          message.stopSession,
          options,
        );
        if (options.oneofs) object.content = 'stopSession';
      }
      if (
        message.systemDeviceInfoRequest != null &&
        message.hasOwnProperty('systemDeviceInfoRequest')
      ) {
        object.systemDeviceInfoRequest =
          $root.PB_System.DeviceInfoRequest.toObject(
            message.systemDeviceInfoRequest,
            options,
          );
        if (options.oneofs) object.content = 'systemDeviceInfoRequest';
      }
      if (
        message.systemDeviceInfoResponse != null &&
        message.hasOwnProperty('systemDeviceInfoResponse')
      ) {
        object.systemDeviceInfoResponse =
          $root.PB_System.DeviceInfoResponse.toObject(
            message.systemDeviceInfoResponse,
            options,
          );
        if (options.oneofs) object.content = 'systemDeviceInfoResponse';
      }
      return object;
    };

    Main.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Main.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/PB.Main';
    };

    return Main;
  })();

  return PB;
})());

export const PB_System = ($root.PB_System = (() => {
  const PB_System = {};

  PB_System.PingRequest = (function () {
    function PingRequest(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    PingRequest.prototype.data = $util.newBuffer([]);

    PingRequest.create = function create(properties) {
      return new PingRequest(properties);
    };

    PingRequest.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.data != null && Object.hasOwnProperty.call(message, 'data'))
        writer.uint32(10).bytes(message.data);
      return writer;
    };

    PingRequest.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    PingRequest.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.PB_System.PingRequest();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.data = reader.bytes();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    PingRequest.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    PingRequest.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      if (message.data != null && message.hasOwnProperty('data'))
        if (
          !(
            (message.data && typeof message.data.length === 'number') ||
            $util.isString(message.data)
          )
        )
          return 'data: buffer expected';
      return null;
    };

    PingRequest.fromObject = function fromObject(object) {
      if (object instanceof $root.PB_System.PingRequest) return object;
      let message = new $root.PB_System.PingRequest();
      if (object.data != null)
        if (typeof object.data === 'string')
          $util.base64.decode(
            object.data,
            (message.data = $util.newBuffer($util.base64.length(object.data))),
            0,
          );
        else if (object.data.length >= 0) message.data = object.data;
      return message;
    };

    PingRequest.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults)
        if (options.bytes === String) object.data = '';
        else {
          object.data = [];
          if (options.bytes !== Array)
            object.data = $util.newBuffer(object.data);
        }
      if (message.data != null && message.hasOwnProperty('data'))
        object.data =
          options.bytes === String
            ? $util.base64.encode(message.data, 0, message.data.length)
            : options.bytes === Array
              ? Array.prototype.slice.call(message.data)
              : message.data;
      return object;
    };

    PingRequest.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    PingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/PB_System.PingRequest';
    };

    return PingRequest;
  })();

  PB_System.PingResponse = (function () {
    function PingResponse(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    PingResponse.prototype.data = $util.newBuffer([]);

    PingResponse.create = function create(properties) {
      return new PingResponse(properties);
    };

    PingResponse.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.data != null && Object.hasOwnProperty.call(message, 'data'))
        writer.uint32(10).bytes(message.data);
      return writer;
    };

    PingResponse.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    PingResponse.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.PB_System.PingResponse();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.data = reader.bytes();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    PingResponse.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    PingResponse.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      if (message.data != null && message.hasOwnProperty('data'))
        if (
          !(
            (message.data && typeof message.data.length === 'number') ||
            $util.isString(message.data)
          )
        )
          return 'data: buffer expected';
      return null;
    };

    PingResponse.fromObject = function fromObject(object) {
      if (object instanceof $root.PB_System.PingResponse) return object;
      let message = new $root.PB_System.PingResponse();
      if (object.data != null)
        if (typeof object.data === 'string')
          $util.base64.decode(
            object.data,
            (message.data = $util.newBuffer($util.base64.length(object.data))),
            0,
          );
        else if (object.data.length >= 0) message.data = object.data;
      return message;
    };

    PingResponse.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults)
        if (options.bytes === String) object.data = '';
        else {
          object.data = [];
          if (options.bytes !== Array)
            object.data = $util.newBuffer(object.data);
        }
      if (message.data != null && message.hasOwnProperty('data'))
        object.data =
          options.bytes === String
            ? $util.base64.encode(message.data, 0, message.data.length)
            : options.bytes === Array
              ? Array.prototype.slice.call(message.data)
              : message.data;
      return object;
    };

    PingResponse.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    PingResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/PB_System.PingResponse';
    };

    return PingResponse;
  })();

  PB_System.DeviceInfoRequest = (function () {
    function DeviceInfoRequest(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    DeviceInfoRequest.create = function create(properties) {
      return new DeviceInfoRequest(properties);
    };

    DeviceInfoRequest.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      return writer;
    };

    DeviceInfoRequest.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    DeviceInfoRequest.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.PB_System.DeviceInfoRequest();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    DeviceInfoRequest.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    DeviceInfoRequest.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      return null;
    };

    DeviceInfoRequest.fromObject = function fromObject(object) {
      if (object instanceof $root.PB_System.DeviceInfoRequest) return object;
      return new $root.PB_System.DeviceInfoRequest();
    };

    DeviceInfoRequest.toObject = function toObject() {
      return {};
    };

    DeviceInfoRequest.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    DeviceInfoRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/PB_System.DeviceInfoRequest';
    };

    return DeviceInfoRequest;
  })();

  PB_System.DeviceInfoResponse = (function () {
    function DeviceInfoResponse(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    DeviceInfoResponse.prototype.key = '';
    DeviceInfoResponse.prototype.value = '';

    DeviceInfoResponse.create = function create(properties) {
      return new DeviceInfoResponse(properties);
    };

    DeviceInfoResponse.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (message.key != null && Object.hasOwnProperty.call(message, 'key'))
        writer.uint32(10).string(message.key);
      if (message.value != null && Object.hasOwnProperty.call(message, 'value'))
        writer.uint32(18).string(message.value);
      return writer;
    };

    DeviceInfoResponse.encodeDelimited = function encodeDelimited(
      message,
      writer,
    ) {
      return this.encode(message, writer).ldelim();
    };

    DeviceInfoResponse.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.PB_System.DeviceInfoResponse();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.key = reader.string();
            break;
          }
          case 2: {
            message.value = reader.string();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    DeviceInfoResponse.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    DeviceInfoResponse.verify = function verify(message) {
      if (typeof message !== 'object' || message === null)
        return 'object expected';
      if (message.key != null && message.hasOwnProperty('key'))
        if (!$util.isString(message.key)) return 'key: string expected';
      if (message.value != null && message.hasOwnProperty('value'))
        if (!$util.isString(message.value)) return 'value: string expected';
      return null;
    };

    DeviceInfoResponse.fromObject = function fromObject(object) {
      if (object instanceof $root.PB_System.DeviceInfoResponse) return object;
      let message = new $root.PB_System.DeviceInfoResponse();
      if (object.key != null) message.key = String(object.key);
      if (object.value != null) message.value = String(object.value);
      return message;
    };

    DeviceInfoResponse.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        object.key = '';
        object.value = '';
      }
      if (message.key != null && message.hasOwnProperty('key'))
        object.key = message.key;
      if (message.value != null && message.hasOwnProperty('value'))
        object.value = message.value;
      return object;
    };

    DeviceInfoResponse.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    DeviceInfoResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com';
      }
      return typeUrlPrefix + '/PB_System.DeviceInfoResponse';
    };

    return DeviceInfoResponse;
  })();

  return PB_System;
})());

export { $root as default };
