export default interface BaseModel {
  id: string;
  typename: string;
  eventStatus: null | string;
  eventResult: null | string;
  updatedBy: null | string;
  revisionId: number;
  updatedAt: string;
  createdAt: string;
}
