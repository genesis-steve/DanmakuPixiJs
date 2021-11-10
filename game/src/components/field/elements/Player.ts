import { ISprite, Sprite } from 'core/src/elements/Sprite';

export class Player extends Sprite {

	protected config: IPlayer;

	protected lives: number;
	protected _speed: number;
	public get speed (): number {
		return this._speed;
	}

	protected init ( config: IPlayer ) {
		super.init( config );
		this.lives = config.lives;
		this._speed = config.speed;
	}

	public getDamage (): void {
		this.lives--;
	}

}

export interface IPlayer extends ISprite {
	lives: number;
	speed: number;
}