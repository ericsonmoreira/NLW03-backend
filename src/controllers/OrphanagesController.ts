import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Orphanage } from '../database/entities/Orphanage';
import orphanageView from '../views/orphanage_view';

export default {
  async index(request: Request, response: Response) {
    const repository = getRepository(Orphanage);

    const orphanages = await repository.find({ relations: ['images'] });
    
    return response.json(orphanageView.renderMany(orphanages));
  },
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const repository = getRepository(Orphanage);
      const orphanage = await repository.findOneOrFail(id, {
        relations: ['images'],
      });
      return response.json(orphanageView.render(orphanage));
    } catch (error) {
      const { message } = error;
      return response.status(202).json({ message });
    }
  },
  async create(request: Request, response: Response) {
    const resquestImages = request.files as Express.Multer.File[];

    const images = resquestImages.map((image) => {
      return { path: image.filename };
    });

    const repository = getRepository(Orphanage);

    const orphanage = repository.create({ ...request.body, images });

    await repository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
