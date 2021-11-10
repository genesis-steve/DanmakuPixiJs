import { ISprite, Sprite } from 'core/src/elements/Sprite';

export class Player extends Sprite {

	protected config: IPlayer;

	protected _speed: number;
	public get speed (): number {
		return this._speed;
	}

	protected init ( config: IPlayer ) {
		super.init( config );
		this._speed = config.speed;
	}

}

export interface IPlayer extends ISprite {
	speed: number;
}