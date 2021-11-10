import { ISprite } from 'core/src/elements/Sprite';
import { Config, IConfig } from 'core/src/ui/Config';


export class FieldConfig extends Config implements IFieldConfig {

	public name: string = 'Field';

	public player: IPlayer = {
		name: 'player',
		assetName: 'flight.png',
		position: { x: 640, y: 360 },
		anchor: { x: 0.5, y: 0.5 }
	};

}

export interface IFieldConfig extends IConfig {
	player: IPlayer;
}

export interface IPlayer extends ISprite {

}