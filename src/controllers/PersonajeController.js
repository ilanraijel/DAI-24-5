import { Router } from 'express';
import { PersonajeService } from '../services/PersonajeService.js';
import { Authenticate } from '../common/jwt.strategy.js';

const router = Router();
const personajeService = new PersonajeService();

router.get('', Authenticate, async (req, res) => {
  console.log("nombre: ", req.query.nombre);
  console.log("edad: ", req.query.edad);
  console.log(`This is a get operation`);

  const {nombre, edad} = req.query;

  const personajes = await personajeService.getPersonaje(nombre, edad);

  return res.status(201).json(personajes);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const personaje = await personajeService.getPersonajeById(req.params.id);

  return res.status(200).json(personaje);

});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const personaje = await personajeService.createPersonaje(req.body);

  return res.status(201).json(personaje);

});

router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const personaje = await personajeService.deletePersonajeById(req.params.id);

  return res.status(200).json(personaje);
  
});

router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const personaje = await personajeService.updatePersonajeById(req.body);

  return res.status(200).json(personaje);
});

export default router;
