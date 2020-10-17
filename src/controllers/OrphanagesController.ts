import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Orphanage } from '../database/entities/Orphanage';
import orphanageView from '../views/orphanage_view';
import * as Yup from 'yup';

// schema validation on Orphanage
const schema = Yup.object().shape({
  name: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().required().max(300),
  instructions: Yup.string().required(),
  opening_hours: Yup.string().required(),
  open_on_week: Yup.boolean().required(),
  images: Yup.array(
    Yup.object().shape({
      path: Yup.string().required(),
    })
  ),
});

export default {
  async index(request: Request, response: Response) {
    const repository = getRepository(Orphanage);

    const orphanages = await repository.find({ relations: ['images'] });

    return response.json(orphanageView.renderMany(orphanages));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const repository = getRepository(Orphanage);

    const orphanage = await repository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(orphanageView.render(orphanage));
  },
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_week,
    } = request.body;

    const repository = getRepository(Orphanage);

    const resquestImages = request.files as Express.Multer.File[];

    const images = resquestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name: String(name),
      latitude: Number(latitude),
      longitude: Number(longitude),
      about: String(about),
      instructions: String(instructions),
      opening_hours: String(opening_hours),
      open_on_week: open_on_week === 'true',
      images,
    };

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = repository.create(data);

    await repository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
