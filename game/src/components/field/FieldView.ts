import { View } from 'core/src/ui/View';
import { Player } from 'game/src/components/field/elements/Player';
import { IFieldConfig, IPlayer } from 'game/src/components/field/FieldConfig';

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
}