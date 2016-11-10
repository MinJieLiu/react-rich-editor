import { Entity } from 'draft-js';
import Image from './image';

export default function ImageBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    const entity = Entity.get(block.getEntityAt(0));
    if (entity && entity.type === 'IMAGE') {
      return {
        component: Image,
        editable: false,
      };
    }
  }
  return undefined;
}
