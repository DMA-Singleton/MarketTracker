interface ErrorEntity {
  param: string;
  value: string;
  msg: string;
}

interface ErrorBodyResponse {
  errors: ErrorEntity[];
}
