
import BaseModel from './BaseModel';

export default interface ToteModel extends BaseModel {
  amounts: Record<string, number>,
  odds: Record<string, number>,
  takeout: number,
  gameId: string,
  eventId: string,
};
