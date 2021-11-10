import { IAsset } from 'core/src/config/AssetList';

function getAssetList (): Array<IAsset> {
	return [
		{
			assetKey: 'flight.png',
			assetUrl: 'assets/flight.png'
		}
	];
}

export const list: Array<IAsset> = getAssetList();