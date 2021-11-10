import { ISprite, Sprite } from 'core/src/elements/Sprite';

export class Player extends Sprite {

	protected config: IPlayer;

	protected lives: number;

	protected init ( config: IPlayer ) {
		super.init( config );
		this.lives = config.lives;
	}

	public getDamage (): void {
		this.lives--;
	}

}

export interface IPlayer extends ISprite {
	lives: number;
}