import { GridRowModel } from '@mui/x-data-grid';

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

export interface RowUpdate {
  old: GridRowModel;
  new: GridRowModel;
}

export interface TranscriptData {
  MASV?: string;
  MALOP?: string;
  DIEMGIUAKY?: number;
  DIEMCUOIKY?: number;
  DIEMTONGKET?: number;
}

export interface TranscriptsFilter {
  HK221: boolean;
  HK222: boolean;
}
