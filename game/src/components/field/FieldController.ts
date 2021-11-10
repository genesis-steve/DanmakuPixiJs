import { Controller } from 'core/src/ui/Controller';
import { FieldConfig, IFieldConfig } from 'game/src/components/field/FieldConfig';
import { FieldView } from 'game/src/components/field/FieldView';

export class FieldController extends Controller {

	protected config: IFieldConfig;
	protected view: FieldView;

	protected init (): void {
		this.config = new FieldConfig();
		this.view = new FieldView( this.config );
	}

}