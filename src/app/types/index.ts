export interface RouteName {
  path: string;
  name: string;
}

export interface QueryResponse {
  metaData: QueryMetadata[];

  rows: any[];
}

export interface QueryMetadata {
  name: string;
}
