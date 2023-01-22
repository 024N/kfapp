export class Constant {
  public static readonly STATUS_OK = 200;
  public static readonly STATUS_CREATED = 201;
  public static readonly STATUS_NO_CONTENT = 204;
  public static readonly STATUS_BAD_REQUEST = 400;
  public static readonly STATUS_UNAUTHORIZED = 401;
  public static readonly STATUS_FORBIDDEN = 403;
  public static readonly STATUS_NOT_FOUND = 404;
  public static readonly STATUS_ALREADY_CREATED = 409;
  public static readonly STATUS_LIMIT_EXCEDED = 429;
  public static readonly STATUS_INTERNAL_SERVER_ERROR = 500;

  public static readonly APPLICATION_JSON = 'application/json';

  public static readonly WRONG_PARAM_BODY = 'Wrong param or body in request';
  public static readonly NO_SAVE_PERMISSION = 'No Permission To Save';
  public static readonly NO_UPDATE_PERMISSION = 'No Permission To Update';
  public static readonly NO_DELETE_PERMISSION = 'No Permission To Delete';
}
