import { ISprite, Sprite } from 'core/src/elements/Sprite';

export class Danmaku extends Sprite {

	protected config: IDanmaku;

	protected _speed: number;
	public get speed (): number {
		return this._speed;
	}

	protected init ( config: IDanmaku ) {
		super.init( config );
		this._speed = config.speed;
	}

}

export interface IDanmaku extends ISprite {
	speed: number;
}