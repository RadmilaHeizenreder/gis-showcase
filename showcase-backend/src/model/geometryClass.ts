import { LineString } from 'geojson';

export class Point {
  type: string;
  coordinates: number[];
}
export class DrawCoords {
  type: LineString;
  coordinates: number[];
}
