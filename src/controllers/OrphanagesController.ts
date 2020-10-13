import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Orphanages } from '../database/entities/Orphanages';

export default {
  async index(request: Request, response: Response) {
    const repository = getRepository(Orphanages);
    const orphanages = await repository.find();
    return response.json(orphanages);
  },
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const repository = getRepository(Orphanages);
      const orphanage = await repository.findOneOrFail(id);
      return response.json(orphanage);
    } catch (error) {
      const { message } = error;
      return response.status(202).json({ message });
    }
  },
  async create(request: Request, response: Response) {
    const repository = getRepository(Orphanages);
    const orphanage = repository.create(request.body);
    await repository.save(orphanage);
    return response.status(201).json(orphanage);
  },
};
