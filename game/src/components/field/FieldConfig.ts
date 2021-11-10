import { Config, IConfig } from 'core/src/ui/Config';
import { IPlayer } from 'game/src/components/field/elements/Player';


export class FieldConfig extends Config implements IFieldConfig {

	public name: string = 'Field';

	public player: IPlayer = {
		name: 'player',
		assetName: 'flight.png',
		position: { x: 640, y: 360 },
		anchor: { x: 0.5, y: 0.5 },
		lives: 3,
		speed: 10
	};

}

export interface IFieldConfig extends IConfig {
	player: IPlayer;
}