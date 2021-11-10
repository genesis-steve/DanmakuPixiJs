import { time } from 'console';
import { MoveDirection } from 'core/src/config/GeneralInterface';
import { IKeyboardPressEventData, KeyboardButton } from 'core/src/core/KeyboardManager';
import { Controller } from 'core/src/ui/Controller';
import { FieldConfig, IFieldConfig } from 'game/src/components/field/FieldConfig';
import { FieldView } from 'game/src/components/field/FieldView';

export class FieldController extends Controller {

	protected config: IFieldConfig;
	protected view: FieldView;

	protected timePass: number = 0;
	protected isGameOver: boolean = false;

	protected init (): void {
		this.config = new FieldConfig();
		this.view = new FieldView( this.config );
		this.addListeners();
	}

	protected addListeners (): void {
		super.addListeners();
		this.view.gameOverSignal.add( this.onGameOver, this );
	}

	protected onGameOver (): void {
		this.isGameOver = true;
	}

	protected onKeyPress ( data: IKeyboardPressEventData ): void {
		if ( this.isGameOver ) { return; }
		for ( let i: number = 0; i < data.buttons.length; i++ ) {
			const code: string = data.buttons[ i ].code;
			switch ( code ) {
				case KeyboardButton.ARROW_UP:
					this.view.moveFlight( MoveDirection.UP );
					break;
				case KeyboardButton.ARROW_DOWN:
					this.view.moveFlight( MoveDirection.DOWN );
					break;
				case KeyboardButton.ARROW_LEFT:
					this.view.moveFlight( MoveDirection.LEFT );
					break;
				case KeyboardButton.ARROW_RIGHT:
					this.view.moveFlight( MoveDirection.RIGHT );
					break;
			}
		}
	}

	public updateFrame ( timePass: number ): void {
		if ( this.isGameOver ) { return; }
		const startTime: number = 500;
		if ( timePass - this.timePass >= this.config.danmakuDuration && timePass >= startTime ) {
			this.timePass = timePass;
			this.view.emitDanmaku();
		}
		this.view.updateDanmaku();
	}

}