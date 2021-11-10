import { Inject } from 'typescript-ioc';
import { MoveDirection } from 'core/src/config/GeneralInterface';
import { Viewport } from 'core/src/core/Viewport';
import { View } from 'core/src/ui/View';
import { IPlayer, Player } from 'game/src/components/field/elements/Player';
import { IFieldConfig } from 'game/src/components/field/FieldConfig';

export class FieldView extends View {

	@Inject
	protected viewport: Viewport;

	protected config: IFieldConfig;

	protected _player: Player;
	public get player (): Player {
		return this._player;
	}

	protected init ( config?: IFieldConfig ): void {
		super.init( config );
		this.addPlayer( config.player );
	}

	protected addPlayer ( config: IPlayer ): void {
		this._player = new Player( config );
		this.addChild( this._player );
	}

	public moveFlight ( direction: MoveDirection ): void {
		const player: Player = this._player;
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
}