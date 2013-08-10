package com.mahjong.controller;
import com.gamekit.display.DisplayTools;
import com.gamekit.mvc.controller.Controller;
import com.mahjong.map.MapTile;
import com.mahjong.model.MapModel;
import com.mahjong.model.ModModel;
import com.mahjong.view.TileView;
import flash.events.MouseEvent;
import flash.geom.Point;
import flash.Lib;
import motion.Actuate;
import motion.easing.Cubic;
import motion.MotionPath;

/**
 * ...
 * @author Guillaume CHAU
 */
class TileController extends Controller
{
	private var _activeMod:ModModel;
	private var _activeMap:MapModel;
	
	private var _tiles:Array<MapTile>;
	
	private var _selectedTile:MapTile;
	
	public function new() 
	{
		super();
		
		_tiles = new Array();
	}
	
	override public function destroy():Void 
	{
		super.destroy();
		
		_clearTiles();
		
		_tiles = null;
	}
	
	/* PRIVATE */
	
	private function _clearTiles():Void
	{
		for (mapTile in _tiles)
		{
			if (mapTile.tile != null)
			{
				mapTile.tile.removeEventListener(MouseEvent.CLICK, _onTileClick);
			}
		}
	}
	
	private function _updateTiles():Void
	{
		for (mapTile in _tiles)
		{
			if (mapTile.tile != null)
			{
				mapTile.tile.addEventListener(MouseEvent.CLICK, _onTileClick);
			}
		}
	}
	
	private function _updateSelectedTile(tile:MapTile):Void
	{
		if (_selectedTile != tile)
		{
			// Unselects the old selected tile if any
			if (_selectedTile != null && _selectedTile.tile != null)
			{
				_selectedTile.tile.selected = false;
			}
			
			_selectedTile = tile;
			
			// Selects the new selected tile
			if (_selectedTile != null && _selectedTile.tile != null)
			{
				_selectedTile.tile.selected = true;
			}
		}
	}
	
	private function _validateTiles(tile1:MapTile, tile2:MapTile):Void
	{
		tile1.tile.selected = false;
		tile2.tile.selected = false;
		tile1.tile.mouseEnabled = false;
		tile2.tile.mouseEnabled = false;
		tile1.tile.mouseChildren = false;
		tile2.tile.mouseChildren = false;
		tile1.enabled = false;
		tile2.enabled = false;
		
		tile1.tile.enableFX = false;
		tile2.tile.enableFX = false;
		
		Actuate.stop(tile1.tile);
		Actuate.stop(tile2.tile);
		
		if (tile1.tile.x > tile2.tile.x)
		{
			var temp:MapTile = tile2;
			tile2 = tile1;
			tile1 = temp;
		}
		
		DisplayTools.bringToFront(tile1.tile);
		DisplayTools.bringToFront(tile2.tile);
		
		var tile1ParentPosition:Point = tile1.tile.parent.localToGlobal(new Point());
		var tile2ParentPosition:Point = tile2.tile.parent.localToGlobal(new Point());
		
		var tile1X:Float = Lib.current.stage.stageWidth * 0.5 - tile1.tile.sizeWidth - tile1ParentPosition.x;
		var tile1Y:Float = (Lib.current.stage.stageHeight - tile1.tile.sizeHeight) * 0.5 - tile1ParentPosition.y;
		var tile2X:Float = Lib.current.stage.stageWidth * 0.5 - tile2ParentPosition.x;
		var tile2Y:Float = (Lib.current.stage.stageHeight - tile2.tile.sizeHeight) * 0.5 - tile2ParentPosition.y;
		
		var tile1Path:MotionPath = new MotionPath();
		tile1Path.bezier(tile1X, tile1Y, Math.min(tile1.tile.x - 200, tile1X - 200), tile1Y);
		
		var tile2Path:MotionPath = new MotionPath();
		tile2Path.bezier(tile2X, tile2Y, Math.max(tile2.tile.x + 200, tile2X + 200), tile2Y);
		
		Actuate.motionPath(tile1.tile, 0.5, { x:tile1Path.x, y:tile1Path.y } ).ease(Cubic.easeOut).onComplete(function():Void
		{
			Actuate.tween(tile1.tile, 0.3, { alpha:0 } ).delay(0.5);
		});
		Actuate.motionPath(tile2.tile, 0.5, { x:tile2Path.x, y:tile2Path.y } ).ease(Cubic.easeOut).onComplete(function():Void
		{
			Actuate.tween(tile2.tile, 0.3, { alpha:0 } ).delay(0.5);
		});
	}
	
	/* EVENTS */
	
	private function _onTileClick(e:MouseEvent):Void
	{
		var clickedTile:TileView = cast e.currentTarget;
		if (clickedTile != null && clickedTile.mapTile != null)
		{
			// Is the tile selectable?
			if (_activeMap.isPositionOpen(clickedTile.mapTile.layer, clickedTile.mapTile.x, clickedTile.mapTile.y))
			{
				// If there is a selected tile, are they associated?
				if (_selectedTile != null && _activeMod != null && _selectedTile.tile != null && _activeMod.areAssociated(_selectedTile.tile.tileModel, clickedTile.tileModel))
				{
					// Take the tiles out
					_validateTiles(_selectedTile, clickedTile.mapTile);
					_selectedTile = null;
				}
				else
				{
					// Select the clicked tile
					selectedTile = clickedTile.mapTile;
				}
			}
			else
			{
				// Shaking animation (you can't select it yet)
				clickedTile.shake();
			}
		}
	}
	
	/* GETTERS */
	
	function get_tiles():Array<MapTile> 
	{
		return _tiles;
	}
	
	function set_tiles(value:Array<MapTile>):Array<MapTile> 
	{
		_clearTiles();
		
		_tiles = value;
		
		_updateTiles();
		
		return _tiles;
	}
	
	public var tiles(get_tiles, set_tiles):Array<MapTile>;
	
	function get_selectedTile():MapTile 
	{
		return _selectedTile;
	}
	
	function set_selectedTile(value:MapTile):MapTile 
	{
		_updateSelectedTile(value);
		
		return _selectedTile;
	}
	
	public var selectedTile(get_selectedTile, set_selectedTile):MapTile;
	
	function get_activeMod():ModModel 
	{
		return _activeMod;
	}
	
	function set_activeMod(value:ModModel):ModModel 
	{
		return _activeMod = value;
	}
	
	public var activeMod(get_activeMod, set_activeMod):ModModel;
	
	function get_activeMap():MapModel 
	{
		return _activeMap;
	}
	
	function set_activeMap(value:MapModel):MapModel 
	{
		return _activeMap = value;
	}
	
	public var activeMap(get_activeMap, set_activeMap):MapModel;
}