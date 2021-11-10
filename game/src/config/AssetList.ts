import { IAsset } from 'core/src/config/AssetList';

function getAssetList (): Array<IAsset> {
	return [
		{
			assetKey: 'flight.png',
			assetUrl: 'assets/flight.png'
		},
		{
			assetKey: 'danmaku.png',
			assetUrl: 'assets/danmaku.png'
		},
		{
			assetKey: 'judgePoint.png',
			assetUrl: 'assets/judgePoint.png'
		}
	];
}

export const list: Array<IAsset> = getAssetList();