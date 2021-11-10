import { GameApplication } from 'core/src/main';
import { IAsset } from 'core/src/config/AssetList';
import * as AssetList from 'game/src/config/AssetList';

window.onload = (): void => {
	new DanmakuGameApplication();
	document.title = 'Danmaku';
};

export class DanmakuGameApplication extends GameApplication {


	protected getAssetList (): Array<IAsset> {
		return AssetList.list;
	}
}