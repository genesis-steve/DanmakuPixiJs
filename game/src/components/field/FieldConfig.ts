import { Inject } from 'typescript-ioc';
import { Viewport } from 'core/src/core/Viewport';
import { IPoint } from 'core/src/elements/DisplayObject';
import { Config, IConfig } from 'core/src/ui/Config';
import { IPlayer } from 'game/src/components/field/elements/Player';
import { IDanmaku } from 'game/src/components/field/elements/Danmaku';
import { ISprite } from 'core/src/elements/Sprite';


export class FieldConfig extends Config implements IFieldConfig {

	@Inject
	protected viewport: Viewport;

	public name: string = 'Field';

	public player: IPlayer = {
		name: 'player',
		assetName: 'flight.png',
		position: { x: 640, y: 360 },
		anchor: { x: 0.5, y: 0.5 },
		speed: 10
	};

	public judgePoint: ISprite = {
		name: 'judgePoint',
		assetName: 'judgePoint.png',
		anchor: { x: 0.5, y: 0.5 }
	};

	public danmaku: IDanmaku = {
		name: 'danmaku',
		assetName: 'danmaku.png',
		anchor: { x: 0.5, y: 0.5 },
		speed: 20
	};

	public danmakuEmitPoint: Array<IPoint> = this.getDanmakuEmitPoint();

	protected getDanmakuEmitPoint (): Array<IPoint> {
		const pointAmountW: number = 10;
		const pointAmountH: number = 10;
		const points: Array<IPoint> = new Array<IPoint>();
		for ( let i: number = 0; i < pointAmountW; i++ ) {
			points.push( ...[
				{
					x: ( Math.floor( this.viewport.width / pointAmountW * 100 ) / 100 ) * i,
					y: 0
				},
				{
					x: ( Math.floor( this.viewport.width / pointAmountW * 100 ) / 100 ) * i,
					y: this.viewport.height
				}
			] );
		};
		for ( let i: number = 0; i < pointAmountH; i++ ) {
			points.push( ...[
				{
					x: 0,
					y: ( Math.floor( this.viewport.height / pointAmountH * 100 ) / 100 ) * i
				},
				{
					x: this.viewport.width,
					y: ( Math.floor( this.viewport.height / pointAmountH * 100 ) / 100 ) * i
				}
			] );
		};
		return points;
	}

	public danmakuDuration: number = 20;

}

export interface IFieldConfig extends IConfig {
	player: IPlayer;
	judgePoint: ISprite;
	danmaku: IDanmaku;
	danmakuEmitPoint: Array<IPoint>;
	danmakuDuration: number;
}