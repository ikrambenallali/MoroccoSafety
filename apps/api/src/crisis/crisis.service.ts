import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crisis, CrisisDocument } from './schemas/crisis.schema';
import { CreateCrisisDto } from './dto/create-crisis.dto';
import { UpdateCrisisDto } from './dto/update-crisis.dto';
import { AlertsService } from 'src/alerts/alerts.service';

@Injectable()
export class CrisisService {
  constructor(@InjectModel(Crisis.name) private crisisModel: Model<CrisisDocument>, private alertsService: AlertsService,) { }

  // Polygon approximatif du Maroc (beaucoup mieux que rectangle)
  private readonly MAROC_POLYGON = [
    [-5.0, 35.8],
    [-1.0, 34.5],
    [-1.5, 32.0],
    [-3.0, 29.0],
    [-6.0, 27.0],
    [-9.5, 28.0],
    [-11.0, 30.0],
    [-10.0, 33.0],
    [-6.5, 35.0],
  ];

  // Fonction point-in-polygon
  private isPointInPolygon(point: [number, number], polygon: number[][]): boolean {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  }

  private isInsideMorocco(lat: number, lng: number): boolean {
    return this.isPointInPolygon([lng, lat], this.MAROC_POLYGON);
  }

 async create(createCrisisDto: CreateCrisisDto): Promise<Crisis> {
  const { latitude, longitude } = createCrisisDto.zone;

  if (!this.isInsideMorocco(latitude, longitude)) {
    throw new BadRequestException("La localisation doit être située au Maroc.");
  }

  // 1. créer crisis
  const crisis = new this.crisisModel(createCrisisDto);
  const savedCrisis = await crisis.save();

  // 2. créer alert automatiquement
  const alert = await this.alertsService.create({
    title: `🚨 ${savedCrisis.title}`,
    message: savedCrisis.description,
    crisisId: savedCrisis._id,
    zone: JSON.stringify(savedCrisis.zone),
  });

  // 3. envoyer alert automatiquement
  await this.alertsService.sendAlert(alert._id.toString());

  return savedCrisis;
}

  async findAll(): Promise<Crisis[]> {
    const crises = await this.crisisModel.find().exec();

    // filtrage propre avec polygon
    return crises.filter(c =>
      this.isInsideMorocco(c.zone.latitude, c.zone.longitude)
    );
  }

  async findOne(id: string): Promise<Crisis> {
    const crisis = await this.crisisModel.findById(id).exec();
    if (!crisis) throw new NotFoundException('Crisis not found');
    return crisis;
  }

  async update(id: string, updateCrisisDto: UpdateCrisisDto): Promise<Crisis> {
    const crisis = await this.crisisModel.findByIdAndUpdate(id, updateCrisisDto, { new: true });
    if (!crisis) throw new NotFoundException('Crisis not found');
    return crisis;
  }

  async remove(id: string): Promise<void> {
    const result = await this.crisisModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Crisis not found');
  }

  async closeCrisis(id: string) {
    return this.crisisModel.findByIdAndUpdate(
      id,
      { status: 'RESOLUE' },
      { new: true }
    );
  }
}