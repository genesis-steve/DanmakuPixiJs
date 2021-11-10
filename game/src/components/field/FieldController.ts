import { MoveDirection } from 'core/src/config/GeneralInterface';
import { IKeyboardPressEventData, KeyboardButton } from 'core/src/core/KeyboardManager';
import { Controller } from 'core/src/ui/Controller';
import { FieldConfig, IFieldConfig } from 'game/src/components/field/FieldConfig';
import { FieldView } from 'game/src/components/field/FieldView';

export class FieldController extends Controller {

	protected config: IFieldConfig;
	protected view: FieldView;

	protected init (): void {
		this.config = new FieldConfig();
		this.view = new FieldView( this.config );
		this.addListeners();
	}

	protected onKeyPress ( data: IKeyboardPressEventData ): void {
		for ( let i: number = 0; i < data.buttons.length; i++ ) {
			const code: string = data.buttons[ i ].code;
			switch ( code ) {
				case KeyboardButton.ARROW_UP:
					this.view.moveFight( MoveDirection.UP );
					break;
				case KeyboardButton.ARROW_DOWN:
					this.view.moveFight( MoveDirection.DOWN );
					break;
				case KeyboardButton.ARROW_LEFT:
					this.view.moveFight( MoveDirection.LEFT );
					break;
				case KeyboardButton.ARROW_RIGHT:
					this.view.moveFight( MoveDirection.RIGHT );
					break;
			}
		}
	}

}