import * as MiniSignal from 'mini-signals';
import { Inject } from 'typescript-ioc';
import { MoveDirection } from 'core/src/config/GeneralInterface';
import { Viewport } from 'core/src/core/Viewport';
import { View } from 'core/src/ui/View';
import { Player } from 'game/src/components/field/elements/Player';
import { IFieldConfig } from 'game/src/components/field/FieldConfig';
import { IPoint } from 'core/src/elements/DisplayObject';
import { Sprite } from 'core/src/elements/Sprite';
import { Danmaku } from 'game/src/components/field/elements/Danmaku';
import { CollisionSystem } from 'core/src/core/CollisionSystem';

export class FieldView extends View {

	@Inject
	protected viewport: Viewport;

	protected config: IFieldConfig;

	protected player: Player;
	protected judgePoint: Sprite;

	protected danmakuGroup: Array<IDanmakuData>;

	public gameOverSignal: MiniSignal;

	protected init ( config?: IFieldConfig ): void {
		super.init( config );
		this.addPlayer( config );
		this.danmakuGroup = new Array<IDanmakuData>();
		this.gameOverSignal = new MiniSignal();
	}

	protected addPlayer ( config: IFieldConfig ): void {
		this.player = new Player( config.player );
		this.addChild( this.player );
		this.judgePoint = new Sprite( config.judgePoint )
		this.player.addChild( this.judgePoint );
	}

	public moveFlight ( direction: MoveDirection ): void {
		const player: Player = this.player;
		switch ( direction ) {
			case MoveDirection.UP:
				if ( player.y - player.height * player.anchor.y - player.speed >= 0 ) {
					player.position.y -= player.speed;
				}
				break;
			case MoveDirection.DOWN:
				if ( player.y + player.height * ( 1 - player.anchor.y ) + player.speed <= this.viewport.height ) {
					player.position.y += player.speed;
				}
				break;
			case MoveDirection.LEFT:
				if ( player.x - player.width * player.anchor.x - player.speed >= 0 ) {
					player.position.x -= player.speed;
				}
				break;
			case MoveDirection.RIGHT:
				if ( player.x + player.width * ( 1 - player.anchor.x ) + player.speed <= this.viewport.width ) {
					player.position.x += player.speed;
				}
				break;
		}
	}

	public emitDanmaku (): void {
		const randomIndex: number = Math.floor( Math.random() * this.config.danmakuEmitPoint.length );
		if ( this.danmakuGroup.find( data => data.emitIndex === randomIndex ) === undefined ) {
			const emitPoint: IPoint = this.config.danmakuEmitPoint[ randomIndex ];
			const danmaku: Danmaku = new Danmaku( this.config.danmaku );
			danmaku.position.set( emitPoint.x, emitPoint.y );
			this.addChild( danmaku );
			this.danmakuGroup.push( {
				danmaku,
				vector: this.getDanmakuVector( danmaku.speed, emitPoint ),
				emitIndex: randomIndex
			} );
		}
	}

	protected getDanmakuVector ( speed: number, emitPoint: IPoint ): IPoint {
		const diffX: number = this.player.x - emitPoint.x;
		const diffY: number = this.player.y - emitPoint.y;
		const distance: number = ( diffX ** 2 + diffY ** 2 ) ** 0.5;
		const multiple: number = speed / distance;
		return { x: diffX * multiple, y: diffY * multiple };
	}

	public updateDanmaku (): void {
		for ( let i: number = 0; i < this.danmakuGroup.length; i++ ) {
			const data: IDanmakuData = this.danmakuGroup[ i ];
			data.danmaku.position.x += data.vector.x;
			data.danmaku.position.y += data.vector.y;
			if ( CollisionSystem.isCollideCircle( data.danmaku, this.judgePoint ) ) {
				this.gameOverSignal.dispatch();
			}
			if ( this.outOfField( data.danmaku ) ) {
				this.removeChild( data.danmaku );
				data.danmaku.destroy();
				this.danmakuGroup.splice( i, 1 );
			}
		}
	}

	protected outOfField ( danmaku: Danmaku ): boolean {
		const offset: number = 50;
		return danmaku.position.x < -offset
			|| danmaku.position.x > this.viewport.width + offset
			|| danmaku.position.y < -offset
			|| danmaku.position.y > this.viewport.height + offset

	}
}

export interface IDanmakuData {
	danmaku: Danmaku;
	vector: IPoint;
	emitIndex: number;
}