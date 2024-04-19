import { PlateInputDto } from './plate-input.dto';

export class PlateDto extends PlateInputDto {

  PlateId: string;
  CarMake: string; 
  isPlateActive: boolean;

  constructor() {
    super();
    this.isPlateActive = true; // Default to active
  }

}
