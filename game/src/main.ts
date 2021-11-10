import { GameApplication } from 'core/src/main';
import { IAsset } from 'core/src/config/AssetList';
import * as AssetList from 'game/src/config/AssetList';
import { FieldController } from 'game/src/components/field/FieldController';

window.onload = (): void => {
	new DanmakuGameApplication();
	document.title = 'Danmaku';
};

export class DanmakuGameApplication extends GameApplication {

	protected fieldController: FieldController;

	protected getAssetList (): Array<IAsset> {
		return AssetList.list;
	}

	protected addComponents (): void {
		this.addField();
	}

	protected addField (): void {
		this.fieldController = new FieldController();
		this.addChild( this.fieldController.mainContainer );
		this.controllerList.push( this.fieldController );
	}

}