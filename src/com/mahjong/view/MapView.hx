package com.mahjong.view;

import com.gamekit.mvc.view.View;
import com.mahjong.map.MapTile;
import com.mahjong.model.MapModel;
import com.mahjong.model.ModModel;
import com.mahjong.model.TileModel;
import motion.Actuate;
import motion.easing.Cubic;

/**
 * ...
 * @author Guillaume CHAU
 */
class MapView extends View
{
	private var _mapModel:MapModel;
	private var _modModel:ModModel;
	
	private var _tiles:Array<TileView>;

	public function new() 
	{
		super();
		
	}
	
	override public function destroy():Void 
	{
		super.destroy();
		
		_mapModel = null;
		_modModel = null;
		_tiles = null;
	}
	
	/* PRIVATE */
	
	override private function _resize():Void 
	{
		super._resize();
	}
	
	override private function _clear():Void 
	{
		super._clear();
		
		// Tiles
		if (_tiles != null)
		{
			for (tile in _tiles)
			{
				tile.destroy();
			}
		}
		_tiles = null;
	}
	
	override private function _applyModel():Void 
	{
		super._applyModel();
		
		_mapModel = cast _model;
		
		if (_mapModel != null && _modModel != null)
		{
			// Clear the tiles
			_clear();
			
			_tiles = new Array();
			
			// Map tiles fill
			_mapModel.mod = _modModel;
			_mapModel.build();
			var tileModel:TileModel;
			for (mapTile in _mapModel.generatedTiles)
			{
				// Tile model
				tileModel = mapTile.model;
				
				// Creates the tile view
				var tileView:TileView = new TileView();
				tileView.setSize(TileView.defaultSizeWidth, TileView.defaultSizeHeight);
				tileView.model = tileModel;
				tileView.displayDepth = mapTile.x * _mapModel.height + mapTile.y + _mapModel.height * _mapModel.width * mapTile.layer;
				tileView.x = TileView.defaultSizeWidth * mapTile.x - TileView.depth * mapTile.layer;
				tileView.y = TileView.defaultSizeHeight * mapTile.y - TileView.depth * mapTile.layer;
				_tiles.push(tileView);
				
				// Association between view and map position
				mapTile.tile = tileView;
				tileView.mapTile = mapTile;
			}
			
			// Depth correction sorting
			_tiles.sort(_sortTileViewOnDepth);
			
			var delay:Float = 0.5;
			for (tileView in _tiles)
			{
				// Adding the tiles in the right order according to their depth
				addChild(tileView);
				
				// Animation
				var tX:Float = tileView.x;
				var tY:Float = tileView.y;
				var angle:Float = Math.random() * Math.PI * 2;
				var distance:Float = Math.random() * 400;
				var sX:Float = _mapModel.width * TileView.defaultSizeWidth * 0.5 + Math.cos(angle) * distance;
				var sY:Float = _mapModel.height * TileView.defaultSizeHeight * 0.5 + Math.sin(angle) * distance;
				tileView.x = sX;
				tileView.y = sY;
				tileView.alpha = 0;
				Actuate.tween(tileView, 0.2, { x: tX, y: tY, alpha:1 } ).delay(delay).ease(Cubic.easeOut).onComplete(function():Void
				{
					tileView.enableFX = true;
				});
				delay += 0.01;
			}
		}
	}
	
	private function _sortTileViewOnDepth(x:TileView, y:TileView):Int
	{
		if (x.displayDepth == y.displayDepth)
		{
			return 0;
		}
		else if (x.displayDepth > y.displayDepth)
		{
			return 1;
		}
		else
		{
			return -1;
		}
	}
	
	/* GETTERS */
	
	function get_mapModel():MapModel 
	{
		return _mapModel;
	}
	
	public var mapModel(get_mapModel, null):MapModel;
	
	function get_modModel():ModModel 
	{
		return _modModel;
	}
	
	function set_modModel(value:ModModel):ModModel 
	{
		return _modModel = value;
	}
	
	public var modModel(get_modModel, set_modModel):ModModel;
	
}