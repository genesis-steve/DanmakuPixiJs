import { MoveDirection } from 'core/src/config/GeneralInterface';
import { View } from 'core/src/ui/View';
import { IPlayer, Player } from 'game/src/components/field/elements/Player';
import { IFieldConfig } from 'game/src/components/field/FieldConfig';

export class FieldView extends View {

	protected config: IFieldConfig;

	protected player: Player;

	protected init ( config?: IFieldConfig ): void {
		super.init( config );
		this.addPlayer( config.player );
	}

	protected addPlayer ( config: IPlayer ): void {
		this.player = new Player( config );
		this.addChild( this.player );
	}

	public moveFight ( direction: MoveDirection ): void {
		switch ( direction ) {
			case MoveDirection.UP:
				this.player.position.y -= this.player.speed;
				break;
			case MoveDirection.DOWN:
				this.player.position.y += this.player.speed;
				break;
			case MoveDirection.LEFT:
				this.player.position.x -= this.player.speed;
				break;
			case MoveDirection.RIGHT:
				this.player.position.x += this.player.speed;
				break;
		}
	}
}